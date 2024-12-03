import React from "react"


const NavbarTitle = ({ tituloSuperior, tituloInferior, logo }) => {

    return (
        <div className="grid col-span-2">
            <div className={`transition-all duration-300 px-5 py-3`}>

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
                                mobile:text-xs
                                `}>
                            {tituloSuperior}
                        </p>
                        <p className={`-mt-1
                                text-white
                                desktop:text-xs
                                laptop-large:text-xs
                                laptop-standar:text-xs 
                                tablet:text-xs
                                mobile:text-[10px]
                                `}>
                            {tituloInferior}
                        </p>
                    </span>
                </span>
            </div>
        </div>
    )
}

export default NavbarTitle