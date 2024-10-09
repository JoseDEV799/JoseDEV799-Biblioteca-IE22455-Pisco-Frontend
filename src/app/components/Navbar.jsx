import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
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
        setIsOpenDropdown(!isOpenDropdown)
    }

    // const toggleDropdownTrue = () => {
    //     setIsOpenDropdown(true);
    // }
    // const toggleDropdownFalse = () => {
    //     setIsOpenDropdown(false);
    // }

    const dropdownRef = useRef(null);

    // Detecta clicks fuera del dropdown para cerrarlo
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpenDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


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

                    <div className='relative inline-block max-lg:w-full'>
                        <div className='flex items-center h-full justify-end'>
                            <Heading
                                level={2}
                                className={'text-[#F0F0F0] dark:text-white flex items-center'}>
                                <div className='flex flex-col -space-y-1'>
                                    <span className='max-sm:text-end sm:text-center'>Jose Falconi</span>
                                    <span className='text-sm max-sm:text-xs max-sm:text-end sm:text-center'>Administracion</span>
                                </div>
                            </Heading>
                            <div ref={dropdownRef}>
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
                                    <UnorderedList className={'border border-gray-300 rounded-md'}>
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
                                        </ListItem>
                                        <ListItem className={'bg-gray-50 rounded-b-md items-center'} onClick={LogoutModal}>
                                            <span className='flex-grow'>Cerrar Sesion</span>
                                            <ArrowRightStartOnRectangleIcon className='fill-red-500 size-4 hover:stroke-2' />
                                        </ListItem>
                                    </UnorderedList>
                                </DropDown>
                            </div>

                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar