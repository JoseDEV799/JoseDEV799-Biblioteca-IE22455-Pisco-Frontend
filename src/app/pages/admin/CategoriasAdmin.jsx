import { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import TitleTableAdmin from "../../components/UI/TitleTableAdmin"
import ButtonAddItemTable from "../../components/UI/ButtonAddItemTable"
import TableAdmin from "../../components/TableAdmin"
import ModalForm from "../../components/ModalForm";
import InputFormModal from "../../components/UI/InputFormModal";
import ButtonSidebar from "../../components/UI/ButtonSidebar";
import { obtenerCategoriasAdmin, crearCategoriaAdmin, modificarCategoriaAdmin, eliminarCategoriaAdmin } from "../../api/category";
import { useOutletContext } from 'react-router-dom';

const CategoriasAdmin = () => {
    // Sidebar
    const { sidebarShow, setSidebarShow } = useOutletContext();
    const handleSidebar = () => setSidebarShow(!sidebarShow)

    // Modal
    const [categoriaModal, setCategoriaModal] = useState(false)
    const [titleCategoriaModal, setTitleCategoriaModal] = useState('')
    const [createOption, setCreateOption] = useState(false)
    const [updateOption, setUpdateOption] = useState(false)
    const [deleteOption, setDeleteOption] = useState(false)

    // Datos
    const [categorias, setCategorias] = useState([])
    const [errors, setErrors] = useState([])
    useEffect(() => {
        const fetch = async () => {
            const response = await obtenerCategoriasAdmin()
            setCategorias(response.data)
        }
        fetch()
    }, [])

    // Formulario
    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [abreviatura, setAbreviatura] = useState('')

    //Actualizar Datos
    const handleNombre = (event) => setNombre(event.target.value)
    const handleAbreviatura = (event) => setAbreviatura(event.target.value)

    // Agregar Categoria
    const AgregarCategoria = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        if (nombre.trim()) formData.append('nombre', nombre);
        if (abreviatura.trim()) formData.append('abreviatura', abreviatura);
        try {
            const response = await crearCategoriaAdmin(formData)
            setCategorias([...categorias, response.data.categoria])
            closeCategoriaModal()
        } catch (error) {
            const errorMessages = error
            setErrors(errorMessages.response.data.error)
        }
    }

    // Modificar Usuario
    const ActualizarCategoria = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('id', id)
        formData.append('nombre', nombre)
        formData.append('abreviatura', abreviatura)
        try {
            const response = await modificarCategoriaAdmin(id, formData)
            setCategorias((prevCategoria) =>
                prevCategoria.map((categoria) =>
                    categoria._id === id ? { ...categoria, ...response.data.categoria } : categoria
                )
            )
            closeCategoriaModal()
        } catch (error) {
            const errorMessages = error
            setErrors(errorMessages.response.data.error)
        }
    }

    // Eliminar Usuario
    const EliminarCategoriaAdmin = async (e) => {
        try {
            e.preventDefault()
            await eliminarCategoriaAdmin(id)
            setCategorias((prevCategoria) =>
                prevCategoria.filter((categoria) => categoria._id !== id)
            )
            closeCategoriaModal()
        } catch (error) {
            console.log(error);
        }
    }

    // Modal Agregar Usuario
    const showAddCategoriaModal = () => {
        setTitleCategoriaModal('Agregar Categoria')
        setErrors([])
        setUpdateOption(false)
        setDeleteOption(false)
        setCreateOption(true)
        setCategoriaModal(true)
        setNombre('')
        setAbreviatura('')
    }

    // Modal Modificar Usuario
    const showUpdateCategoriaModal = (row) => {
        setTitleCategoriaModal('Modificar Categoria')
        setErrors([])
        setCreateOption(false)
        setDeleteOption(false)
        setUpdateOption(true)
        setCategoriaModal(true)
        setId(row._id)
        setNombre(row.nombre)
        setAbreviatura(row.abreviatura)
    }

    // Modal Eliminar Usuario
    const showDeleteCategoriaModal = (row) => {
        setTitleCategoriaModal('Eliminar Categoria')
        setErrors([])
        setUpdateOption(false)
        setCreateOption(false)
        setDeleteOption(true)
        setCategoriaModal(true)
        setId(row._id)
        setNombre(row.nombre)
        setAbreviatura(row.abreviatura)
    }


    const closeCategoriaModal = () => setCategoriaModal(false)

    return (
        <>
            <div className="flex justify-between w-full items-center mb-2">
                <ButtonSidebar
                    isShow={sidebarShow}
                    onClick={handleSidebar} />
                <TitleTableAdmin title={'Categoria'} />
                <ButtonAddItemTable text={'Agregar Categoria'} onClick={showAddCategoriaModal} />
            </div>

            <TableAdmin
                headers={['Nombre', 'Abreviatura']}
                headerFields={['nombre', 'abreviatura']}
                rows={categorias}
                editOption
                deleteOption
                titleUpdateButton={'Modificar Categoria'}
                titleDeleteButton={'Eliminar Categoria'}
                iconEdit={<MdEdit />}
                iconDelete={<MdDelete />}
                onClickEdit={showUpdateCategoriaModal}
                onClickDelete={showDeleteCategoriaModal}
            />

            <ModalForm
                options
                title={titleCategoriaModal}
                show={categoriaModal}
                isAdd={createOption}
                isUpdate={updateOption}
                isDelete={deleteOption}
                onSubmit={
                    createOption ? AgregarCategoria :
                        (updateOption ? ActualizarCategoria : EliminarCategoriaAdmin)
                }
                onClose={closeCategoriaModal}
                onClickCancel={closeCategoriaModal}>

                <InputFormModal
                    type={deleteOption ? 'delete' : 'text'}
                    title={'Nombre'}
                    value={nombre}
                    onChange={handleNombre}
                    name={'nombre'}
                    error={errors} />

                <InputFormModal
                    type={deleteOption ? 'delete' : 'text'}
                    title={'Abreviatura'}
                    value={abreviatura}
                    onChange={handleAbreviatura}
                    name={'abreviatura'}
                    error={errors} />

            </ModalForm>
        </>
    )
}

export default CategoriasAdmin