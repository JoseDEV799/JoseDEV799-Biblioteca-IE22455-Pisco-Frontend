import { useEffect, useState } from "react";
import { FaUserEdit, FaUserMinus } from "react-icons/fa";
import TitleTableAdmin from "../../components/UI/TitleTableAdmin"
import ButtonAddItemTable from "../../components/UI/ButtonAddItemTable"
import TableAdmin from "../../components/TableAdmin"
import ModalForm from "../../components/ModalForm";
import InputFormModal from "../../components/UI/InputFormModal";
import { obtenerUsuarios, registrarUsuario, modificarUsuario, eliminarUsuario, cambiarContraseñaUsuario } from "../../api/user";
import { PiPassword } from "react-icons/pi";
import ButtonSidebar from "../../components/UI/ButtonSidebar";
import { useOutletContext } from 'react-router-dom';

const UsuariosAdmin = () => {

    // Sidebar
    const { sidebarShow, setSidebarShow } = useOutletContext();
    const handleSidebar = () => setSidebarShow(!sidebarShow)

    // Modal
    const [userModal, setUserModal] = useState(false)
    const [titleUserModal, setTitleUserModal] = useState('')
    const [createOption, setCreateOption] = useState(false)
    const [updateOption, setUpdateOption] = useState(false)
    const [deleteOption, setDeleteOption] = useState(false)
    const [passwordInput, setPasswordInput] = useState(false)


    // Modal Delete
    const [userChangePasswordModal, setUserChangePasswordModal] = useState(false)

    // Datos
    const [usuarios, setUsuarios] = useState([])
    const [errors, setErrors] = useState([])
    useEffect(() => {
        const fetch = async () => {
            const response = await obtenerUsuarios()
            console.log(response.data);

            setUsuarios(response.data)
        }
        fetch()
    }, [])

    // Formulario
    const [id, setId] = useState('')
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [dni, setDNI] = useState('')
    const [correo, setCorreo] = useState('')
    const [rol, setRol] = useState('')
    const [password, setPassword] = useState('')

    //Actualizar Datos
    // const handleID = (id) => setId(id) //Sin uso, de momento.
    const handleNombres = (event) => setNombres(event.target.value)
    const handleApellidos = (event) => setApellidos(event.target.value)
    const handleDNI = (event) => setDNI(event.target.value)
    const handleCorreo = (event) => setCorreo(event.target.value)
    const handleRol = (event) => setRol(event.target.value)
    const handlePassword = (event) => setPassword(event.target.value)

    // Agregar Usuario
    const AgregarUsuario = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        if (nombres.trim()) formData.append('nombres', nombres);
        if (apellidos.trim()) formData.append('apellidos', apellidos);
        if (dni.trim()) formData.append('dni', dni);
        if (correo.trim()) formData.append('correo', correo);
        formData.append('rol', rol);
        formData.append('password', password);
        try {
            const response = await registrarUsuario(formData)
            setUsuarios([...usuarios, response.data.user])
            console.log(response);
            closeUserModal()
        } catch (error) {
            const errorMessages = error
            setErrors(errorMessages.response.data.error)
        }
    }

    // Modificar Usuario
    const ActualizarUsuario = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('id', id)
        formData.append('nombres', nombres)
        formData.append('apellidos', apellidos)
        formData.append('dni', dni)
        formData.append('correo', correo)
        formData.append('rol', rol)
        try {
            const response = await modificarUsuario(id, formData)
            setUsuarios((prevUsuarios) =>
                prevUsuarios.map((user) =>
                    user._id === id ? { ...user, ...response.data.user } : user
                )
            )
            console.log(response);
            closeUserModal()
        } catch (error) {
            const errorMessages = error
            setErrors(errorMessages.response.data.error)
        }
    }

    // Eliminar Usuario
    const EliminarUsuarioAdmin = async (e) => {
        try {
            e.preventDefault()
            await eliminarUsuario(id)
            setUsuarios((prevUsuarios) =>
                prevUsuarios.filter((user) => user._id !== id)
            )
            closeUserModal()
        } catch (error) {
            console.log(error);
        }

    }

    const CambiarContraseña = async(e) => {
        try {
            e.preventDefault()
            const formData = new FormData()
            formData.append('id', id)
            formData.append('password', password)
            await cambiarContraseñaUsuario(formData)
            closeChangePasswordModal()
        } catch (error) {
            const errorMessages = error
            setErrors(errorMessages.response.data.error)
        }
    }

    // Modal Agregar Usuario
    const showAddUserModal = () => {
        setTitleUserModal('Agregar Usuario')
        setErrors([])
        setUpdateOption(false)
        setDeleteOption(false)
        setCreateOption(true)
        setUserModal(true)
        setPasswordInput(false)
        setNombres('')
        setApellidos('')
        setCorreo('')
        setDNI('')
        setRol('Admin')
        setPassword('')
    }

    // Modal Modificar Usuario
    const showUpdateUserModal = (row) => {
        setTitleUserModal('Modificar Usuario')
        setErrors([])
        setPasswordInput(true)
        setCreateOption(false)
        setDeleteOption(false)
        setUpdateOption(true)
        setUserModal(true)
        setId(row._id)
        setNombres(row.nombres)
        setApellidos(row.apellidos)
        setCorreo(row.correo)
        setDNI(row.dni)
        setRol(row.rol)
        setPassword(row.password)
    }

    // Modal Eliminar Usuario
    const showDeleteUserModal = (row) => {
        setTitleUserModal('Eliminar Usuario')
        setErrors([])
        setPasswordInput(true)
        setUpdateOption(false)
        setCreateOption(false)
        setDeleteOption(true)
        setUserModal(true)
        setId(row._id)
        setNombres(row.nombres)
        setApellidos(row.apellidos)
        setCorreo(row.correo)
        setDNI(row.dni)
        setRol(row.rol)
    }

    const showChangePasswordModal = (row) => {
        setErrors([])
        setId(row._id)
        setNombres(row.nombres)
        setApellidos(row.apellidos)
        setPassword('')
        setUserChangePasswordModal(true)
    }

    const closeUserModal = () => setUserModal(false)
    const closeChangePasswordModal = () => setUserChangePasswordModal(false)

    const optionsSelect = [
        {
            value: 'Admin',
            text: 'Administrador'
        },
        {
            value: 'Estudiante',
            text: 'Estudiante'
        }
    ]

    return (
        <>
            <div className="flex justify-between w-full items-center mb-2">
                <ButtonSidebar
                    isShow={sidebarShow} 
                    onClick={handleSidebar}/>
                <TitleTableAdmin title={'Usuarios'} />
                <ButtonAddItemTable text={'Agregar Usuario'} onClick={showAddUserModal} />
            </div>
            <TableAdmin
                headers={['Nombres', 'Apellidos', 'Correo', 'DNI', 'Rol']}
                headerFields={['nombres', 'apellidos', 'correo', 'dni', 'rol']}
                rows={usuarios}
                editOption
                deleteOption
                titleUpdateButton={'Modificar Usuario'}
                titleDeleteButton={'Eliminar Usuario'}
                iconEdit={<FaUserEdit />}
                iconDelete={<FaUserMinus />}
                onClickEdit={showUpdateUserModal}
                onClickDelete={showDeleteUserModal}
                extraOptions={
                    (row) =>
                        <>
                            <button onClick={() => showChangePasswordModal(row)}
                                title="Cambiar contraseña"
                                className="transition-all duration-300 active:scale-105">
                                <PiPassword className="size-6 mr-2 fill-blue-600 hover:fill-blue-700" />
                            </button>
                        </>
                }
            />

            <ModalForm
                options
                title={titleUserModal}
                show={userModal}
                isAdd={createOption}
                isUpdate={updateOption}
                isDelete={deleteOption}
                onSubmit={
                    createOption ? AgregarUsuario :
                        (updateOption ? ActualizarUsuario : EliminarUsuarioAdmin)
                }
                onClose={closeUserModal}
                onClickCancel={closeUserModal}>

                <InputFormModal
                    type={deleteOption ? 'delete' : 'text'}
                    title={'Nombre'}
                    value={nombres}
                    onChange={handleNombres} 
                    name={'nombres'}
                    error={errors}/>

                <InputFormModal
                    type={deleteOption ? 'delete' : 'text'}
                    title={'Apellidos'}
                    value={apellidos}
                    onChange={handleApellidos} 
                    name={'apellidos'}
                    error={errors}/>

                <InputFormModal
                    type={deleteOption ? 'delete' : 'text'}
                    title={'DNI'}
                    value={dni}
                    onChange={handleDNI} 
                    name={'dni'}
                    error={errors}/>

                <InputFormModal
                    type={deleteOption ? 'delete' : 'text'}
                    title={'Correo'}
                    value={correo}
                    onChange={handleCorreo} 
                    name={'correo'}
                    error={errors}/>

                <InputFormModal
                    type={deleteOption ? 'delete' : 'options'}
                    optionsSelect={optionsSelect}
                    optionValue={'value'}
                    optionText={'text'}
                    title={'Rol'}
                    value={rol}
                    onChange={handleRol} />

                {!passwordInput &&
                    <InputFormModal
                        title={'Contraseña'}
                        type={'password'}
                        value={password}
                        onChange={handlePassword} 
                        name={'password'}
                        error={errors}/>
                }
            </ModalForm>

            {/* Modal Cambiar constraseña */}
            <ModalForm
                options
                title={'Cambiar contraseña'}
                addTitleButton={'Confirmar'}
                isAdd={true}
                show={userChangePasswordModal}
                onSubmit={CambiarContraseña}
                onClose={closeChangePasswordModal}
                onClickCancel={closeChangePasswordModal}>

                <InputFormModal
                    type={'onlyRead'}
                    title={'Nombre'}
                    value={nombres}
                    onChange={handleNombres}/>

                <InputFormModal
                    type={'onlyRead'}
                    title={'Apellidos'}
                    value={apellidos}
                    onChange={handleApellidos} />

                <InputFormModal
                    title={'Contraseña'}
                    type={'password'}
                    value={password}
                    placeholderText={'Nueva contraseña'}
                    onChange={handlePassword} 
                    name={'password'}
                    error={errors}/>

            </ModalForm>
        </>
    )

}

export default UsuariosAdmin