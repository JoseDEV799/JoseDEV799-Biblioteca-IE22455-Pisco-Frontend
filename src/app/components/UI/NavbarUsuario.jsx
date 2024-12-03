import { IoMdSettings } from "react-icons/io";

const NavbarUsuario = ({ nombre = 'Invitado', rol = '', onClick, children }) => {

    return (
        <div className="grid col-span-1 w-full">
            <div className="flex w-full h-full mobile:px-3">
                <div className="flex flex-col w-full h-full items-end justify-center">
                    <span className={` text-white leading-3 font-semibold
                        desktop:text-xs
                        laptop-large:text-xs
                        laptop-standar:text-xs
                        tablet:text-xs
                        mobile:text-xs
                        max-tablet:hidden
                        `}>
                        {nombre}
                    </span>
                    <span className={`
                        -mt-1
                        text-white
                        desktop:text-xs
                        laptop-large:text-xs
                        laptop-standar:text-xs
                        tablet:text-xs
                        mobile:text-[10px]
                        max-tablet:hidden
                        `}>
                        {rol}
                    </span>
                </div>
                <button type="button" onClick={onClick} className="group transition-all duration-300 pl-2">
                    <IoMdSettings className="size-6 fill-white group-hover:fill-gray-100 transition-all duration-300" />
                </button>
            </div>
        </div>
    )
}

export default NavbarUsuario