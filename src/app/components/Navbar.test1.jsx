import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import {
    EllipsisVerticalIcon,
    ArrowRightStartOnRectangleIcon,
    UserIcon,
    Cog6ToothIcon,
    KeyIcon
} from '@heroicons/react/24/solid'
import {
    ButtonTheme,
    Heading,
    Button,
    UnorderedList,
    ListItem,
    Modal,
    DropDown,
    Label,
    Input
} from './UI/index'
import iconSchool from '../assets/icons/iconSchool.png'

const Navbar = () => {

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // User Authenticated
    const { user, isAuthenticated, logout, signin } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = handleSubmit(async (data) => {
        await signin(data)
        // window.location.reload()
    })


    // //* Espera la comprobacion del usuario autenticado
    // const [loadingUser, setLoadingUser] = useState(false);
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setLoadingUser(true);
    //     }, 200);
    //     return () => clearTimeout(timer);
    // }, []);

    // Dropdown
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const toggleDropdown = () => {
        setIsOpenDropdown(!isOpenDropdown);
    };

    //Modal
    const [isOpenModalLogin, setIsOpenModalLogin] = useState(false)
    const showModalLogin = () => {
        setIsOpenModalLogin(!isOpenModalLogin)
    }
    const LogoutModal = () => {
        logout() //Con parentesis lo detecta como funcion del context
        toggleDropdown()
    }

    return (
        <>
            {/* START Navbar */}
            {/* <nav className="flex w-full bg-gradient-to-r from-[#2196F3] to-[#1976D2] dark:bg-[#137FD9]"> */}
            {/* <nav className="flex w-full max-sm:py-1 sm:py-2 2xl:py-3 items-center bg-gradient-to-r from-[#137FD9] to-[#0076d6] dark:from-[#013a74] dark:to-[#2196F3]"> */}
            <nav className="flex border-b -mt-[1px] border-white dark:border-slate-500 w-full max-sm:py-1 sm:py-2 2xl:py-3 items-center bg-[#137FD9] dark:dark:bg-blue-950">

                {/* Titulo */}
                <h1 className='hidden'>Biblioteca Digital - Jose de la Torre Ugarte</h1>
                <Heading
                    level={1}
                    className={'text-[#F0F0F0] dark:text-white flex items-center justify-start w-1/2 max-sm:w-2/3 max-sm:pl-1 sm:pl-3 md:pl-4 py-1 font-extrabold'}>
                    <img src={iconSchool} alt="" className='flex h-10 max-sm:h-12 max-sm:px-1 sm:px-3 md:px-5' />
                    <div className='flex flex-col -space-y-2'>
                        <span className=''>Biblioteca Digital</span>
                        <span className='text-sm max-sm:text-xs'>Jose de la Torre Ugarte</span>
                    </div>
                </Heading>


                <div className="flex max-sm:w-1/3 sm:w-1/2 justify-end max-md:relative pr-2">
                    {loading ?
                        (
                            <>
                                {isAuthenticated ?
                                    (
                                        <>
                                            <div className='relative inline-block max-lg:w-full'>
                                                <div className='flex items-center h-full justify-end'>
                                                    <Heading key={user._id}
                                                        level={2}
                                                        className={'text-[#F0F0F0] dark:text-white flex items-center'}>
                                                        <div className='flex flex-col -space-y-1'>
                                                            <span className='max-sm:text-end sm:text-center'>{user.username}</span>
                                                            <span className='text-sm max-sm:text-xs max-sm:text-end sm:text-center'>Administrador</span>
                                                        </div>
                                                    </Heading>
                                                    <Button
                                                        onClick={toggleDropdown}
                                                        className={'items-center'}
                                                        text={<EllipsisVerticalIcon className='fill-white size-6 z-10' />}>

                                                    </Button>
                                                    <DropDown
                                                        isOpenDropdown={isOpenDropdown}
                                                        className={`bg-gray-300 -bottom-24 rounded-md right-0 max-md:w-full md:w-1/2 lg:w-[150%] z-20`}
                                                        classOpen={`opacity-100 translate-y-0 scale-100`}
                                                        classClose={`scale-0 -translate-y-full translate-x-1/2 opacity-0`}>
                                                        <UnorderedList
                                                            className={'border border-gray-300 rounded-md'}>
                                                            <ListItem className={'bg-gray-50 border-b rounded-t-md items-center'}>
                                                                <span className='flex-grow'>Tema</span>
                                                                <ButtonTheme />
                                                            </ListItem>
                                                            <ListItem className={'bg-gray-50 border-b group items-center'}>
                                                                <span className='flex-grow'>Administrar</span>
                                                                <div className='relative'>
                                                                    <UserIcon className='size-5 fill-gray-700' />
                                                                    <Cog6ToothIcon className='group-focus:animate-spin group-hover:animate-spin size-3.5 absolute -bottom-1 right-0 fill-black stroke-gray-50 stroke-2 ' />
                                                                </div>
                                                                {/* <KeyIcon className='fill-yellow-400 size-4' /> */}
                                                            </ListItem>
                                                            <ListItem className={'bg-gray-50 rounded-b-md items-center'} onClick={LogoutModal}>
                                                                <span className='flex-grow'>Cerrar Sesion</span>
                                                                <ArrowRightStartOnRectangleIcon className='fill-red-500 size-4 hover:stroke-2' />
                                                            </ListItem>
                                                        </UnorderedList>
                                                    </DropDown>
                                                </div>
                                            </div>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <Button
                                                text={'Iniciar Sesion'}
                                                onClick={showModalLogin}
                                                className={'bg-white dark:bg-zinc-700 rounded-md my-3 px-2'}
                                            />
                                        </>
                                    )

                                }
                            </>
                        )
                        :
                        (
                            <>
                                <span className='bg-gray-300 w-1/4 h-10 animate-pulse' />
                            </>
                        )
                    }
                </div>
            </nav>
            <Modal
                isOpen={isOpenModalLogin}
                submit={onSubmit}
                title={'Iniciar Sesion'}
                accept={'Iniciar Sesion'}>

                <Label
                    text={'Nombre o DNI'}
                    className={'text-black'} />
                <Input
                    iconStatus={true}
                    iconDirection={'left'}
                    placeholder={'Ingrese su usuario o DNI'}
                    icon={<UserIcon className='size-4 fill-slate-400' />}
                    register={register}
                    IDForm={'dni'} />

                <Label
                    text={'Contraseña'}
                    className={'text-black mt-2'} />
                <Input
                    iconStatus={true}
                    iconDirection={'left'}
                    type={'password'}
                    placeholder={'Ingrese su contraseña'}
                    icon={<KeyIcon className='size-4 fill-slate-400' />}
                    register={register}
                    IDForm={'password'} />
            </Modal>
        </>
    )
}

export default Navbar