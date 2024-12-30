import { useOutletContext } from "react-router-dom";
import ModalForm from "../../components/ModalForm";
import TableAdmin from "../../components/TableAdmin";
import ButtonAddItemTable from "../../components/UI/ButtonAddItemTable";
import ButtonSidebar from "../../components/UI/ButtonSidebar";
import InputFormModal from "../../components/UI/InputFormModal";
import TitleTableAdmin from "../../components/UI/TitleTableAdmin";
import { useEffect, useState } from "react";
import { MdEdit, MdDelete  } from "react-icons/md";
import { obtenerAutoresAdmin } from "../../api/autor";

const AutoresAdmin = () => {

    // Sidebar
    const { sidebarShow, setSidebarShow } = useOutletContext();
    const handleSidebar = () => setSidebarShow(!sidebarShow)

    // Modal
    const [autorModal, setAutorModal] = useState(false)
    const [titleAutorModal, setTitleAutorModal] = useState('')
    const [createOption, setCreateOption] = useState(false)
    const [updateOption, setUpdateOption] = useState(false)
    const [deleteOption, setDeleteOption] = useState(false)

    // Datos
    const [autores, setAutores] = useState([])
    const [errors, setErrors] = useState([])
    useEffect(() => {
        const fetch = async () => {
            const response = await obtenerAutoresAdmin()
            setAutores(response.data)
        }
        fetch()
    }, [])

    // Formulario
    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [fotografia, setFotografia] = useState(null)

    //Actualizar Datos
    const handleNombre = (event) => setNombre(event.target.value)
    const handleFotografia = (event) => setFotografia(event.target.files)


    // Agregar Categoria
    const AgregarAutor = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        if (nombre.trim()) formData.append('nombre', nombre);
        if (fotografia) formData.append('fotografia', fotografia);
        try {
            const response = await crearCategoriaAdmin(formData)
            setAutores([...autores, response.data.autor])
            closeAutorModal()
        } catch (error) {
            const errorMessages = error
            setErrors(errorMessages.response.data.error)
        }
    }

    // Modificar Usuario
    const ActualizarAutor = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('id', id)
        if (nombre.trim()) formData.append('nombre', nombre);
        if (fotografia) formData.append('fotografia', fotografia);
        try {
            const response = await modificarCategoriaAdmin(id, formData)
            setAutores((prevAutor) =>
                prevAutor.map((autor) =>
                    autor._id === id ? { ...autor, ...response.data.autor } : autor
                )
            )
            closeAutorModal()
        } catch (error) {
            const errorMessages = error
            setErrors(errorMessages.response.data.error)
        }
    }

    // Eliminar Usuario
    const EliminarAutorAdmin = async (e) => {
        try {
            e.preventDefault()
            await eliminarCategoriaAdmin(id)
            setCategorias((prevAutor) =>
                prevAutor.filter((autor) => autor._id !== id)
            )
            closeCategoriaModal()
        } catch (error) {
            console.log(error);
        }
    }

    // Modal Agregar Usuario
    const showAddAutorModal = () => {
        setTitleAutorModal('Agregar Autor')
        setErrors([])
        setUpdateOption(false)
        setDeleteOption(false)
        setCreateOption(true)
        setAutorModal(true)
        setNombre('')
        setFotografia(null)
    }

    // Modal Modificar Usuario
    const showUpdateAutorModal = (row) => {
        setTitleAutorModal('Modificar Autor')
        setErrors([])
        setCreateOption(false)
        setDeleteOption(false)
        setUpdateOption(true)
        setAutorModal(true)
        setId(row._id)
        setNombre(row.nombre)
        setFotografia(row.fotografia)        
    }

    // Modal Eliminar Usuario
    const showDeleteCategoriaModal = (row) => {
        setTitleAutorModal('Eliminar Autor')
        setErrors([])
        setUpdateOption(false)
        setCreateOption(false)
        setDeleteOption(true)
        setAutorModal(true)
        setId(row._id)
        setNombre(row.nombre)
        setFotografia(row.fotografia)
    }


    const closeAutorModal = () => setCategoriaModal(false)

    return (
        <>
            <div className="flex justify-between w-full items-center mb-2">
                <ButtonSidebar
                    isShow={sidebarShow}
                    onClick={handleSidebar} />
                <TitleTableAdmin title={'Autores'} />
                <ButtonAddItemTable text={'Agregar Autor'} onClick={showAddAutorModal} />
            </div>

            <TableAdmin
                headers={['Nombre']}
                headerFields={['nombre']}
                rows={autores}
                editOption
                deleteOption
                titleUpdateButton={'Modificar Autor'}
                titleDeleteButton={'Eliminar Autor'}
                iconEdit={<MdEdit />}
                iconDelete={<MdDelete />}
                onClickEdit={showUpdateAutorModal}
                onClickDelete={showDeleteCategoriaModal}
            />

            <ModalForm
                options
                title={titleAutorModal}
                show={autorModal}
                isAdd={createOption}
                isUpdate={updateOption}
                isDelete={deleteOption}
                onSubmit={
                    createOption ? AgregarAutor :
                        (updateOption ? ActualizarAutor : EliminarAutorAdmin)
                }
                onClose={closeAutorModal}
                onClickCancel={closeAutorModal}>

                <InputFormModal
                    type={deleteOption ? 'delete' : 'text'}
                    title={'Nombre'}
                    value={nombre}
                    onChange={handleNombre}
                    name={'nombre'}
                    error={errors} />

                <InputFormModal
                    type={deleteOption ? 'delete' : 'text'}
                    title={'Fotografia'}
                    value={fotografia}
                    onChange={handleFotografia}
                    name={'fotografia'}
                    error={errors} />

            </ModalForm>
        </>
    )
}

export default AutoresAdmin