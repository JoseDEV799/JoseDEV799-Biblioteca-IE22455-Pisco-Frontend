import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const SearchBooksClient = ({ row, onClick, placeholder, className, valueFilter = [] }) => {

    const [dropdown, setDropdown] = useState(false)
    const [dataFilter, setDataFilter] = useState([])
    const [filterTextBook, setFilterTextBook] = useState('')
    const handleFilterTextBook = (e) => setFilterTextBook(e.target.value)

    // Normalizar texto, sin tildes o caracter especiales
    const normalizeString = (str) => {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }

    useEffect(() => {
        const filteredBooks = row
            .filter((rowCurrent) =>
                valueFilter.some((value) =>
                    normalizeString(String(rowCurrent[value]))
                        .includes(normalizeString(filterTextBook))
                )
            )
            .slice(0, 3)
        setDataFilter(filteredBooks)
    }, [filterTextBook, row])

    return (
        <div className="flex flex-grow max-laptop-standar:justify-start justify-end items-center">
            <div className={`relative flex h-max desktop:w-1/3 items-center shadow-md rounded-sm bg-white ${className}`}>
                <IoSearchSharp className="absolute left-2 size-6 fill-gray-200" />
                <input
                    type="text"
                    placeholder={placeholder}
                    value={filterTextBook}
                    onChange={handleFilterTextBook}
                    className={`flex p-2 w-full pl-10 placeholder:italic rounded-md`}
                />
                <div onBlur={()=>setDropdown(false)} onFocus={()=>setDropdown(true)}
                    className={`absolute z-20 bg-white rounded-md top-10 w-full left-0
                        ${filterTextBook.trim() ? 'scale-100' : 'scale-0'}
                    `}>
                    {dataFilter.map((rowCurrent, index) => (
                        <div className={`flex flex-col w-full p-2 transition-all duration-300 
                            bg-white hover:bg-gray-200 cursor-pointer
                            ${index == 0 && 'rounded-t-md'}
                            ${index !== dataFilter.length - 1 ? 'border-b' : 'rounded-b-md'}
                            `}
                            onClick={()=>onClick(rowCurrent)}
                            key={index}>
                            <p className="w-full font-semibold">
                                {rowCurrent[valueFilter[0]]}
                            </p>
                            <p className="w-full italic">
                                {rowCurrent[valueFilter[1]]}
                            </p>
                        </div>
                    ))}
                    {dataFilter.map((rowCurrent, index) => (
                        <div className={`flex flex-col w-full p-2 transition-all duration-300 
                            bg-white hover:bg-gray-200 cursor-pointer
                            ${index == 0 && 'rounded-t-md'}
                            ${index !== dataFilter.length - 1 ? 'border-b' : 'rounded-b-md'}
                            `}
                            onClick={()=>onClick(rowCurrent)}
                            key={index}>
                            <p className="w-full font-semibold">
                                {rowCurrent[valueFilter[0]]}
                            </p>
                            <p className="w-full italic">
                                {rowCurrent[valueFilter[1]]}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchBooksClient