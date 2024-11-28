import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { UnorderedList, ListNavigate } from '../../components/UI/index'
import { FaUsers, FaArrowCircleRight } from "react-icons/fa";
const Administracion = () => {

    const navigate = useNavigate()


    const [toolbar, setToolbar] = useState(true)
    const handleToolbar = () => {
        setToolbar(!toolbar)
    }

    return (
        <>
            <div className='flex flex-col h-screen'>
                <nav className='bg-sky-500 p-5'>Hola</nav>
                <div className='flex h-full '>
                    
                    <div className='fixed left-0 bottom-0 top-16 z-10 w-24 hover:w-80 bg-gray-500 transition-all duration-300 ease-out'>

                    </div>

                    <div className='flex flex-grow-0 ml-24 w-full bg-gray-900'>
                        <Outlet />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Administracion