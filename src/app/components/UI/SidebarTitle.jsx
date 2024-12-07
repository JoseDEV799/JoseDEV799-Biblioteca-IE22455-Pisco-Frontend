import React from "react"

const SidebarTitle = ({ logo, isHovered, tituloSuperior, tituloInferior, className }) => {

    return (
        <div className={`group bg-[#0069C0] relative w-full py-8 text-center transition-all duration-300 ${className} `}>

            <div className={`
                absolute inset-0 flex items-center max-laptop-standar:px-5 laptop-standar:px-0 laptop-standar:justify-center justify-between
                transition-all duration-300
                ${isHovered ? 'laptop-standar:opacity-100 laptop-standar:scale-100' : 'laptop-standar:opacity-0 laptop-standar:scale-0'}`}>

                <span className={`group-hover:text-black font-extralight flex
                    laptop-large:text-lg
                    laptop-standar:text-md`}>

                    {React.cloneElement(logo, {
                        className: `group-hover:fill-blue-500 size-6 transition-all mr-2 duration-300`,
                    })}
                    <span className="flex flex-col items-start justify-center ml-2">
                        <p className={`
                                text-white leading-3 font-semibold
                                desktop:text-xs
                                laptop-large:text-xs
                                laptop-standar:text-xs
                                tablet:text-xs
                                max-tablet:text-xs
                                `}>
                            {tituloSuperior}
                        </p>
                        <p className={`
                                text-white
                                desktop:text-xs
                                laptop-large:text-xs
                                laptop-standar:text-sm laptop-standar:-mt-1
                                tablet:text-xs
                                max-tablet:text-xs
                                `}>
                            {tituloInferior}
                        </p>
                    </span>
                </span>
            </div>

            {/* Contenedor del icono */}
            <div className={`
                max-laptop-standar:hidden
                absolute inset-0 flex items-center justify-center
                transition-all duration-300
                ${isHovered ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>
                {React.cloneElement(logo, {
                    className: `size-6 transition-all duration-300`,
                })}
            </div>
        </div>
    )
}

export default SidebarTitle