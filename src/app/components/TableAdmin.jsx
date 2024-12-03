import React, { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { MdLastPage } from "react-icons/md";
import { MdOutlineFirstPage } from "react-icons/md";

const TableAdmin = ({
    headers = [], // ['Nombre', 'Edad', 'Email']
    headerFields = [], // ['name', 'age', 'email']
    rows = [],
    iconEdit,
    iconDelete,
    editOption = false,
    deleteOption = false,
    titleUpdateButton,
    titleDeleteButton,
    onClickEdit,
    onClickDelete,
    itemsPerPage = 5, // Elementos por página
    cellTypes = {}, // { age: 'number', date: 'date', active: 'boolean' }
    extraOptions,
    extraHeaders,
    extraData
}) => {
    // Estados para ordenamiento, paginación y filtros
    const [sortConfig, setSortConfig] = useState({ field: '', direction: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [filterText, setFilterText] = useState('');
    const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);

    // Función para formatear valores según su tipo
    const formatCellValue = (value, field) => {
        const type = cellTypes[field];
        if (value === null || value === undefined) return '';

        switch (type) {
            case 'date':
                return new Date(value).toLocaleDateString();
            case 'boolean':
                return value ? 'Sí' : 'No';
            case 'number':
                return typeof value === 'number' ? value.toLocaleString() : value;
            default:
                return value;
        }
    };

    // Lógica de ordenamiento
    const sortedRows = useMemo(() => {
        let sortedItems = [...rows];
        if (sortConfig.field) {
            sortedItems.sort((a, b) => {
                const aValue = a[sortConfig.field];
                const bValue = b[sortConfig.field];

                if (cellTypes[sortConfig.field] === 'number') {
                    return sortConfig.direction === 'asc'
                        ? aValue - bValue
                        : bValue - aValue;
                }

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortedItems;
    }, [rows, sortConfig, cellTypes]);

    // Lógica de filtrado
    const filteredRows = useMemo(() => {
        if (!filterText) return sortedRows;

        return sortedRows.filter(row =>
            headerFields.some(field => {
                const value = row[field];
                return value && value.toString().toLowerCase().includes(filterText.toLowerCase());
            })
        );
    }, [sortedRows, filterText, headerFields]);

    // Lógica de paginación
    const totalPages = Math.ceil(filteredRows.length / itemsPerPageState);
    const paginatedRows = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPageState;
        return filteredRows.slice(start, start + itemsPerPageState);
    }, [filteredRows, currentPage, itemsPerPageState]);

    // Función para cambiar el ordenamiento
    const requestSort = (field) => {
        let direction = 'asc';
        if (sortConfig.field === field) {
            if (sortConfig.direction === 'asc') {
                direction = 'desc';
            } else if (sortConfig.direction === 'desc') {
                direction = '';
            }
        }
        setSortConfig({ field, direction });
    };

    // Renderizado del ícono de ordenamiento
    const getSortIcon = (field) => {
        if (sortConfig.field !== field) return <ChevronsUpDown className="size-4" />;
        if (sortConfig.direction === 'asc') return <ChevronUp className="size-4" />;
        if (sortConfig.direction === 'desc') return <ChevronDown className="size-4" />;
        return <ChevronsUpDown className="size-4" />;
    };

    return (
        <div className="space-y-4">
            {/* Controles superiores */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
                {/* Búsqueda */}
                <div className="relative max-laptop-standar:w-full flex-grow flex">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="pl-10 pr-4 py-2 w-1/2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 max-laptop-standar:w-full"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />
                </div>

                {/* Selector de items por página */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Mostrar:</span>
                    <select
                        className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={itemsPerPageState}
                        onChange={(e) => {
                            setItemsPerPageState(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        {[5, 10, 25, 50].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50">
                        <tr>
                            {headers.map((header, index) => (
                                <th
                                    key={index}
                                    className="px-6 py-3 cursor-pointer hover:bg-gray-100"
                                    onClick={() => requestSort(headerFields[index])}
                                >
                                    <div className="flex items-center gap-2">
                                        {header}
                                        {getSortIcon(headerFields[index])}
                                    </div>
                                </th>
                            ))}
                            {(editOption || deleteOption) && (
                                <th className="px-6 py-3 cursor-default">Acciones</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedRows.length > 0 ? (
                            paginatedRows.map((row, rowIndex) => (
                                <tr
                                    key={row._id || rowIndex}
                                    className={`bg-white border-b hover:bg-gray-50 ${rowIndex % 2 === 0 ? "bg-gray-50" : ""
                                        }`}
                                >
                                    {headerFields.map((field, cellIndex) => (
                                        <td key={cellIndex} className="px-6 py-4">
                                            {formatCellValue(row[field], field)}
                                        </td>
                                    ))}
                                    {(editOption || deleteOption) && (
                                        <td className="flex justify-start space-x-5 px-6 py-4">
                                            {editOption && (
                                                <button
                                                    onClick={() => onClickEdit(row)}
                                                    title={titleUpdateButton}
                                                    className="transition-all duration-300 active:scale-105"
                                                >
                                                    {React.cloneElement(iconEdit, {
                                                        className: "size-6 mr-2 fill-yellow-300 hover:fill-yellow-400 stroke-yellow-300 hover:stroke-yellow-400"
                                                    })}
                                                </button>
                                            )}
                                            {deleteOption && (
                                                <button
                                                    onClick={() => onClickDelete(row)}
                                                    title={titleDeleteButton}
                                                    className="transition-all duration-300 active:scale-105"
                                                >
                                                    {React.cloneElement(iconDelete, {
                                                        className: "size-6 mr-2 fill-red-600 hover:fill-red-700 stroke-red-600 hover:stroke-red-700"
                                                    })}
                                                </button>
                                            )}
                                            {extraOptions && typeof extraOptions === 'function' && extraOptions(row)}
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={headers.length + (editOption || deleteOption ? 1 : 0)}
                                    className="px-6 py-4 text-center text-gray-500"
                                >
                                    No se encontraron resultados
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="flex flex-wrap gap-4 items-center tablet:justify-center laptop-large:justify-between">
                <div className="text-sm text-gray-600">
                    Mostrando {((currentPage - 1) * itemsPerPageState) + 1} a {Math.min(currentPage * itemsPerPageState, filteredRows.length)} de {filteredRows.length} resultados
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <p className='max-laptop-standar:hidden'>Primera</p>
                        <MdOutlineFirstPage className='laptop-standar:hidden'/>
                    </button>
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <p className='max-laptop-standar:hidden'>Anterior</p>
                        <MdNavigateBefore className='laptop-standar:hidden'/>
                    </button>
                    <span className="px-3 py-1 border rounded-lg bg-blue-50">
                        {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <p className='max-laptop-standar:hidden'>Siguiente</p>
                        <MdNavigateNext className='laptop-standar:hidden'/>
                    </button>
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <p className='max-laptop-standar:hidden'>Última</p>
                        <MdLastPage className='laptop-standar:hidden'/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TableAdmin;