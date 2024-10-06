import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'

export default function Modal() {

    // const {
    //     register,
    //     handleSubmit,
    //     formState: {errors}
    // } = useForm()

    // const { signup, user } = useAuth()
    // console.log(user)

    // const onSubmit = handleSubmit(async (values) => {
    //     signup(values)
    // })

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const { signin } = useAuth()
    const onSubmit = handleSubmit(async (data) => {
        signin(data)
    })

    const { handlelogout } = useAuth()
    const logoutUser = () => {
        handlelogout()
    }
    // console.log(useAuth())

    return (
        <>
            {/* START Modal  */}
            <div className="fixed inset-0 top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black bg-opacity-50">
                <form onSubmit={onSubmit}>
                    {/* START Body Modal */}
                    <div className="flex flex-col justify-center items-center bg-white">
                        <div>
                            <h1>Login</h1>
                        </div>
                        <div>
                            <p>DNI</p>
                            <input type="text" {...register('dni', { required: true })} />
                            <p>Contraseña</p>
                            <input type="text" {...register('password', { required: true })} />
                        </div>
                        <div>
                            <button type='submit'>Login</button>
                            {/* <button>Cancelar</button> */}
                        </div>
                    </div>
                    {/* <button onChange={logout()}>
                        Logout
                    </button> */}
                    {/* END Body Modal */}
                </form>
                <button onClick={logoutUser}>Logout</button>
            </div>
            {/* END Modal  */}
        </>
    )
}