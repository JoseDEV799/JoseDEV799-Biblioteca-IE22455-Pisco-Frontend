import { useEffect, useState } from "react"
import { LuUserCircle2 } from "react-icons/lu";
import ButtonTheme from "./ButtonTheme";
import { RiLogoutBoxLine } from "react-icons/ri";

const SidebarUserData = ({ className, isHovered }) => {

    const [userCurrent, setUserCurrent] = useState(null)

    useEffect(() => {
        console.log('Hola');
    }, [])

    return (
        <>
            <div className={` bg-[#137FD9] relative w-full py-10 laptop-standar:py-16 text-center transition-all duration-300 ${className} 
                border-y border-gray-100`}>

                <div className={`
                absolute inset-0 flex flex-row laptop-standar:flex-col items-center justify-center
                transition-all duration-300
                ${isHovered ? 'laptop-standar:opacity-100 laptop-standar:scale-100' : 'laptop-standar:opacity-0 laptop-standar:scale-0'}`}>

                    {(userCurrent && userCurrent) ?
                        (
                            <LuUserCircle2 className="size-8 stroke-white" />
                        )
                        :
                        (
                            <>
                                <div className="flex w-full space-x-2 items-center justify-start px-5">
                                    <span className="flex justify-center items-center size-8 border-2 border-white rounded-full">
                                        <span className="text-sm text-white font-semibold">J</span>
                                        <span className="text-sm text-white font-semibold">F</span>
                                    </span>
                                    <div className="flex flex-col mt-1.5">
                                        <span className="text-lg leading-3 text-white">Jose Falconi</span>
                                        <span className="text-sm text-white">Administrador</span>
                                    </div>
                                </div>
                                <div className="flex justify-between w-full px-5 mt-2">
                                    <button className="group text-white flex  hover:text-gray-300 transition-all duration-300">
                                        <RiLogoutBoxLine className="size-6 group-hover:fill-gray-300 fill-gray-50 transition-all duration-300"/>
                                        Cerrar Sesion
                                    </button>
                                    <ButtonTheme />
                                </div>
                            </>
                        )
                    }

                </div>

                {/* Contenedor del icono */}
                <div className={`
                    max-laptop-standar:hidden
                    absolute inset-0 flex items-center justify-center
                    transition-all duration-300
                    ${isHovered ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>

                    {(userCurrent && userCurrent) ?
                        (
                            <span className="flex justify-center items-center size-8 border-2 border-white rounded-full">
                                <span className="text-sm text-white font-semibold">J</span>
                                <span className="text-sm text-white font-semibold">F</span>
                            </span>
                        )
                        :
                        (
                            <LuUserCircle2 className="size-8 stroke-white" />
                        )
                    }

                </div>
            </div>
        </>
    )
}
export default SidebarUserData