import React from "react"
import { useNavigate } from "react-router-dom"

const ReturnPageMainSidebar = ({ route, text, isHovered, className, iconCompact }) => {

    const navigate = useNavigate()

    return (
        <>
        <div
            className={`group border-t border-white mt-auto relative w-full py-8 text-center transition-all duration-300 cursor-pointer ${className} bg-[#0069C0] hover:bg-gray-50`}
            onClick={() => navigate(route)}>
            
            <div className={`
                absolute inset-0 flex items-center max-laptop-standar:px-5 laptop-standar:px-0 laptop-standar:justify-center
                transition-all duration-300
                ${isHovered ? 'laptop-standar:opacity-100 laptop-standar:scale-100' : 'laptop-standar:opacity-0 laptop-standar:scale-0'}`}>

                <span className={`flex justify-between tablet:w-full laptop-standar:w-auto`}>
                    {React.cloneElement(iconCompact, {
                        className: `group-hover:fill-blue-500 size-6 transition-all  mr-2 duration-300 fill-white
                        tablet:order-2 laptop-standar:order-1`,
                    })}
                    <p className={`group-hover:text-black text-white font-extralight transition-all duration-300
                        tablet:order-1 laptop-standar:order-2
                        laptop-large:text-lg
                        laptop-standar:text-md
                        `}>

                        {text}
                    </p>
                </span>
            </div>

            {/* Contenedor del icono */}
            <div className={`
                max-laptop-standar:hidden
                absolute inset-0 flex items-center justify-center
                transition-all duration-300 
                ${isHovered ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}
            `}>
                {React.cloneElement(iconCompact, {
                    className: `size-6 transition-all duration-300 fill-white`,
                })}
            </div>
        </div>
        </>
    )
}

export default ReturnPageMainSidebar