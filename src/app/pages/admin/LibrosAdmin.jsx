import { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import TitleTableAdmin from "../../components/UI/TitleTableAdmin"
import ButtonAddItemTable from "../../components/UI/ButtonAddItemTable"
import TableAdmin from "../../components/TableAdmin"
import ModalForm from "../../components/ModalForm";
import InputFormModal from "../../components/UI/InputFormModal";
import ButtonSidebar from "../../components/UI/ButtonSidebar";
import { FaFilePdf } from "react-icons/fa6";
import { useOutletContext } from 'react-router-dom';
import { FaFileExcel, FaEye, FaFileImage } from "react-icons/fa";
import { obtenerCategoriasAdmin } from "../../api/category";
import { obtenerLibrosAdmin, agregarLibroAdmin, modificarLibroAdmin, eliminarLibroAdmin } from "../../api/book";
import ButtonNextSectionModal from "../../components/UI/ButtonNextSectionModal";
import ButtonPrevSectionModal from "../../components/UI/ButtonPrevSectionModal";
import ImageModalPortada from "../../components/UI/ImageModalPortada";


const LibrosAdmin = () => {

    // Eventos
    const [newPortada, setNewPortada] = useState(false)
    const [newPdf, setNewPdf] = useState(false)

    // Sidebar
    const { sidebarShow, setSidebarShow } = useOutletContext();
    const handleSidebar = () => setSidebarShow(!sidebarShow)

    // Modal
    const [libroModal, setLibroModal] = useState(false)
    const [titleLibroModal, setTitleLibroModal] = useState('')
    const [createOption, setCreateOption] = useState(false)
    const [updateOption, setUpdateOption] = useState(false)
    const [deleteOption, setDeleteOption] = useState(false)
    const [prevPortada, setPrevPortada] = useState(null)
    const [prevPdf, setPrevPdf] = useState('')
    const [modalPage, setModalPage] = useState(false)

    // Datos
    const [categorias, setCategorias] = useState([])
    const [libros, setLibros] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const fetchCategorias = async () => {
            const response = await obtenerCategoriasAdmin()
            setCategorias(response.data)
        }
        const fetchLibros = async () => {
            const response = await obtenerLibrosAdmin()
            setLibros(response.data)
        }
        fetchCategorias()
        fetchLibros()
    }, [])



    // Formulario
    const [id, setId] = useState('')
    const [denominacion, setDenominacion] = useState('')
    const [autor, setAutor] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [observacion, setObservacion] = useState('')
    const [area, setArea] = useState('')
    const [portada, setPortada] = useState(null)
    const [pdf, setPdf] = useState(null)
    const [categoria_id, setCategoria_id] = useState('')

    //Actualizar Datos
    const handleDenominacion = (e) => setDenominacion(e.target.value)
    const handleAutor = (e) => setAutor(e.target.value)
    const handleCantidad = (e) => setCantidad(e.target.value)
    const handleObservacion = (e) => setObservacion(e.target.value)
    const handleArea = (e) => setArea(e.target.value)
    const handleCategoria_id = (e) => setCategoria_id(e.target.value)
    const handlePortada = (e) => {
        setNewPortada(false)
        setPortada(e.target.files[0])
    }
    const handlePdf = (e) => {
        setNewPdf(false)
        setPdf(e.target.files[0])
    }


    // Agregar Categoria
    const AgregarLibro = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        if (denominacion.trim()) formData.append('denominacion', denominacion);
        if (autor.trim()) formData.append('autor', autor);
        if (cantidad.trim()) formData.append('cantidad', cantidad);
        if (observacion.trim()) formData.append('observacion', observacion);
        if (area.trim()) formData.append('area', area);
        if (categoria_id) formData.append('categoria_id', categoria_id);
        if (portada) formData.append('portada', portada);
        if (pdf) formData.append('pdf', pdf);
        try {
            const response = await agregarLibroAdmin(formData)
            setLibros([...libros, response.data.libro])
            closeLibroModal()
        } catch (error) {
            const errorMessages = error
            setErrors(errorMessages.response.data.error)
        }
    }

    // Modificar Usuario
    const ActualizarLibro = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('id', id)
        if (denominacion?.trim()) formData.append('denominacion', denominacion);
        if (autor?.trim()) formData.append('autor', autor);
        if (cantidad?.trim()) formData.append('cantidad', cantidad);
        if (observacion?.trim()) formData.append('observacion', observacion);
        if (area?.trim()) formData.append('area', area);
        if (categoria_id) formData.append('categoria_id', categoria_id);
        if (!newPortada) {
            if (portada) formData.append('portada', portada);
        } else {
            formData.append('portada', null)
        }
        if (!newPdf) {
            if (pdf) formData.append('pdf', pdf);
        } else {
            formData.append('pdf', null);
        }
        try {
            const response = await modificarLibroAdmin(id, formData)
            setLibros((prevLibro) =>
                prevLibro.map((libro) =>
                    libro._id === id ? { ...libro, ...response.data.libro } : libro
                )
            )
            closeLibroModal()
        } catch (error) {
            const errorMessages = error
            setErrors(errorMessages.response.data.error)
        }
    }

    // Eliminar Usuario
    const EliminarLibroAdmin = async (e) => {
        try {
            e.preventDefault()
            await eliminarLibroAdmin(id)
            setLibros((prevLibro) =>
                prevLibro.filter((libro) => libro._id !== id)
            )
            closeLibroModal()
        } catch (error) {
            console.log(error);
        }
    }

    // Modal Agregar Usuario
    const showAddLibroModal = () => {
        setTitleLibroModal('Agregar Libro')
        setErrors([])
        setNewPortada(true)
        setNewPdf(true)
        setUpdateOption(false)
        setDeleteOption(false)
        setCreateOption(true)
        setDenominacion('')
        setAutor('')
        setCantidad('')
        setArea('')
        setObservacion('Observacion')
        setCategoria_id('')
        setPortada(null)
        setPdf(null)
        setPrevPdf('')
        setPrevPdf('')
        setLibroModal(true)
    }

    // Modal Modificar Usuario
    const showUpdateLibroModal = (row) => {
        setTitleLibroModal('Modificar Categoria')
        setErrors([])
        setCreateOption(false)
        setDeleteOption(false)
        setUpdateOption(true)
        setDenominacion(row.denominacion)
        setId(row._id)
        setAutor(row.autor)
        setCantidad(row.cantidad)
        setArea(row.area)
        setObservacion(row.observacion)
        setCategoria_id(categorias.find((categoria) => categoria.nombre === row.category_id)?._id)
        setPortada(null)
        setPdf(null)
        if (row.portada) {
            setPrevPortada(row.portada)
            setNewPortada(false)
        } else {
            setNewPortada(true)
        }
        if (row.pdf) {
            setPrevPdf(row.pdf)
            setNewPdf(false)
        } else {
            setNewPdf(true)
        }
        setLibroModal(true)
    }

    // Modal Eliminar Usuario
    const showDeleteLibroModal = (row) => {
        setTitleLibroModal('Eliminar Categoria')
        setErrors([])
        setUpdateOption(false)
        setCreateOption(false)
        setDeleteOption(true)
        setId(row._id)
        setDenominacion(row.denominacion)
        setAutor(row.autor)
        setArea(row.area)
        setCantidad(row.cantidad)
        setObservacion(row.observacion)
        setCategoria_id(row.category_id ? categorias.find((categoria) => categoria.nombre == row.category_id)?.nombre : 'Sin Categoria')
        setPortada(null)
        setPdf(null)
        if (row.portada) {
            setPrevPortada(row.portada)
            setNewPortada(false)
        } else {
            setNewPortada(true)
        }
        if (row.pdf) {
            setPrevPdf(row.pdf)
            setNewPdf(false)
        } else {
            setNewPdf(true)
        }
        setLibroModal(true)
    }

    const closeLibroModal = () => setLibroModal(false)
    const prevModal = () => setModalPage(false)
    const nextModal = () => setModalPage(true)

    const emptyPortada = () => {
        setNewPortada(true)
        setPrevPortada(null)
        setPortada(null)
    }

    const emptyPdf = () => {
        setNewPdf(true)
        setPrevPdf(null)
        setPdf(null)
    }

    const optionsSelect = [
        {
            value: 'Original',
            text: 'Original'
        },
        {
            value: 'Copia',
            text: 'Copia'
        }
    ]

    return (
        <>
            <div className="flex justify-between w-full items-center mb-2">
                <ButtonSidebar
                    isShow={sidebarShow}
                    onClick={handleSidebar} />
                <TitleTableAdmin title={'Libros'} />
                <ButtonAddItemTable text={'Agregar Libro'} onClick={showAddLibroModal} />
            </div>

            <TableAdmin
                headers={['Denominacion', 'Autor', 'Categoria', 'Area', 'Cantidad', 'Observacion']}
                headerFields={['denominacion', 'autor_id', 'category_id', 'area', 'cantidad', 'observacion']}
                rows={libros}
                editOption
                deleteOption
                titleUpdateButton={'Modificar Libro'}
                titleDeleteButton={'Eliminar Libro'}
                iconEdit={<MdEdit />}
                iconDelete={<MdDelete />}
                onClickEdit={showUpdateLibroModal}
                onClickDelete={showDeleteLibroModal}
            />

            <ModalForm
                options
                title={titleLibroModal}
                show={libroModal}
                isAdd={createOption}
                isUpdate={updateOption}
                isDelete={deleteOption}
                className={'w-[48rem] mx-10'}
                onSubmit={
                    createOption ? AgregarLibro :
                        (updateOption ? ActualizarLibro : EliminarLibroAdmin)
                }
                onClose={closeLibroModal}
                onClickCancel={closeLibroModal}>

                <div className="h-full w-full grid tablet:grid-cols-1 laptop-standar:grid-cols-2 gap-8 relative">
                    <div className="w-full h-full">
                        <InputFormModal
                            type={deleteOption ? 'delete' : 'text'}
                            title={'Denominación'}
                            value={denominacion}
                            onChange={handleDenominacion}
                            name={'denominacion'}
                            error={errors} />

                        <InputFormModal
                            type={deleteOption ? 'delete' : 'text'}
                            title={'Autor'}
                            value={autor}
                            onChange={handleAutor}
                            name={'autor'}
                            error={errors} />

                        <InputFormModal
                            type={deleteOption ? 'delete' : 'options'}
                            optionsSelect={optionsSelect}
                            optionValue={'value'}
                            optionText={'text'}
                            title={'Observacion'}
                            value={observacion}
                            onChange={handleObservacion}
                            name={'observacion'}
                            error={errors} />

                        <InputFormModal
                            type={deleteOption ? 'delete' : 'text'}
                            title={'Area'}
                            value={area}
                            onChange={handleArea}
                            name={'area'}
                            error={errors} />

                        <InputFormModal
                            type={deleteOption ? 'delete' : 'text'}
                            title={'Cantidad'}
                            value={cantidad}
                            onChange={handleCantidad}
                            name={'cantidad'}
                            error={errors} />

                        <InputFormModal
                            type={deleteOption ? 'delete' : 'options'}
                            optionsSelect={categorias}
                            optionValue={'_id'}
                            optionText={'nombre'}
                            optionNull={'Sin categoria'}
                            title={'Categoria'}
                            value={categoria_id}
                            onChange={handleCategoria_id}
                            name={'categoria_id'}
                            error={errors} />
                    </div>
                    <span className="absolute border-r-2 top-0 bottom-0 right-1/2 max-laptop-standar:hidden" />
                    <div className="w-full h-full flex flex-row relative overflow-x-hidden overflow-y-hidden transition-all duration-300">

                        <ButtonPrevSectionModal
                            onClick={prevModal}
                            className={`${modalPage ? 'scale-100' : 'scale-0'}`}
                        />

                        <ButtonNextSectionModal
                            onClick={nextModal}
                            className={`${modalPage ? 'scale-0' : 'scale-100'}`}
                        />


                        {/* Eliminar Portada y PDF */}


                        <button onClick={emptyPortada}
                            type="button"
                            title="Quitar portada"
                            className={`group absolute left-1/2 bottom-0 transform -translate-x-1/2 z-10
                            ${deleteOption && 'hidden'}
                            ${!newPortada && modalPage === false ? 'translate-y-0' : 'translate-y-10'}`}>
                            <FaFileExcel className="size-6 fill-red-500 group-hover:fill-red-600" />
                        </button>


                        <button onClick={emptyPdf}
                            type="button"
                            title="Quitar PDF"
                            className={`group absolute left-1/2 bottom-0 transform -translate-x-1/2 z-10
                            ${deleteOption && 'hidden'}
                            ${!newPdf && modalPage === true ? 'translate-y-0' : 'translate-y-10'}`}>
                            <FaFileExcel className="size-6 fill-red-500 group-hover:fill-red-600" />
                        </button>
                        {/* Eliminar Portada y PDF */}


                        <div className="flex flex-shrink-0 w-full max-laptop-standar:min-h-screen relative justify-center transition-all duration-300"
                            style={{ transform: `translateX(${modalPage ? '-100%' : '0'})` }}>

                            <div className={`
                                transition-all duration-300 absolute inset-0 flex justify-center 
                                ${!newPortada ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                                `}>
                                <ImageModalPortada alt={'Portada'}
                                    src={
                                        (!newPortada && prevPortada) ? prevPortada :
                                            portada ? URL.createObjectURL(portada) : null
                                    }
                                />
                            </div>

                            <p className={`${deleteOption && newPortada ? 'z-10' : 'hidden'} absolute inset-0 flex items-center justify-center`}>
                                Sin portada
                            </p>

                            <InputFormModal
                                className={`${newPortada ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} ${deleteOption && 'hidden'}`}
                                title={'Portada del libro'}
                                type={'file'}
                                value={portada}
                                onChange={handlePortada}
                                htmlFor={'upload-portada'}
                                iconUpFile={<FaFileImage />}
                                buttonTextFile={'Subir portada'}
                                key={portada ? portada.name : 'default'}
                            />

                        </div>

                        {/* <span className="absolute border-t-2 top-1/2 left-0 right-0" /> */}
                        <div className="h-full w-full flex flex-shrink-0 justify-center transition-all duration-300"
                            style={{ transform: `translateX(${modalPage ? '-100%' : '0'})` }}>
                            <InputFormModal
                                className={`${newPdf ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} ${deleteOption && 'hidden'}`}
                                title={'PDF del libro'}
                                type={'file'}
                                onChange={handlePdf}
                                value={pdf}
                                htmlFor={'upload-pdf'}
                                iconUpFile={<FaFilePdf />}
                                buttonTextFile={'Subir pdf'}
                                key={pdf ? pdf.name : 'default'}
                            />

                            <p className={`${deleteOption && newPdf ? 'z-10' : 'hidden'} absolute inset-0 flex items-center justify-center`}>
                                Sin PDF
                            </p>

                            <div className={`absolute inset-0 flex flex-col space-y-5 justify-center items-center transition-all duration-300
                                ${!newPdf ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                                <p className="whitespace-normal italic">{pdf ? pdf.name : ''}</p>
                                <button title="Ver PDF" type="button"
                                    onClick={() => {
                                        if (prevPdf) {
                                            // Si hay un PDF preexistente, abrirlo en una nueva pestaña
                                            window.open(prevPdf, '_blank', 'noopener noreferrer');
                                        } else if (pdf) {
                                            // Si hay un nuevo PDF cargado, crear una URL de objeto y abrirlo
                                            const pdfURL = URL.createObjectURL(pdf);
                                            window.open(pdfURL, '_blank', 'noopener noreferrer');
                                        }
                                    }}
                                    className="group flex space-x-2 p-2 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-all duration-300">
                                    <FaEye className="group-hover:fill-gray-100 size-6 fill-white" />
                                </button>

                            </div>

                        </div>

                    </div>
                </div>

            </ModalForm>
        </>
    )
}

export default LibrosAdmin