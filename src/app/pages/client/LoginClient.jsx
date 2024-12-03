import ModalForm from "../../components/ModalForm"
import ButtonLogin from "../../components/UI/ButtonLogin"
import InputFormModal from "../../components/UI/InputFormModal"
import BackgroundLogin from '../../../../public/Login.jpg'
import { useNavigate } from "react-router-dom"

const LoginPage = () => {

    const navigate = useNavigate()

    const login = (e) => {
        e.preventDefault()
        navigate('/')
    }

    return (
        <div className="fixed inset-0 bg-gray-200">
            <img src={BackgroundLogin} 
                alt="Background"
                className="w-full h-full" 
                />
            <ModalForm 
                title={'Iniciar Sesion'}
                isLogin={true}
                show={true}
                onSubmit={login}>
                
                <InputFormModal
                    title={'DNI'}
                    type={'text'}
                    placeholderText={'Ingresa tu DNI'}
                />

                <InputFormModal
                    title={'Contraseña'}
                    type={'password'}
                    placeholderText={'Ingrese su contraseña'}
                />
                
                <ButtonLogin />

            </ModalForm>
        </div>
    )
}

export default LoginPage