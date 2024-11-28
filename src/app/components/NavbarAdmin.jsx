import { useState } from "react"
import Dropdown from "./Dropdown"
import ButtonDropdown from "./UI/ButtonDropdown"
import LogoColegio from "./UI/LogoColegio"
import NavbarTitle from "./UI/NavbarTitle"
import NavbarUsuario from "./UI/NavbarUsuario"


const NavbarAdmin = () => {

    const [dropdownNabvar, setDropdownNabvar] = useState(false)
    const handleDropdownNabvar = () => {
        setDropdownNabvar(!dropdownNabvar)
    }

    return (
        <nav className="grid grid-cols-3 max-tablet:hidden h-max w-full px-10 py-1 bg-[#137FD9] dark:bg-[#364c5e]">
            <div className="col-span-2 flex w-full ml-2 space-x-2 items-center justify-start">
                <LogoColegio />
                <NavbarTitle
                    tituloSuperior={'JOSE DE LA TORRE UGARTE'}
                    tituloInferior={'Biblioteca Digital'}
                />
            </div>
            <div className="col-span-1 flex w-full justify-end items-center">
                <div className="flex items-center space-x-2 relative">
                    <NavbarUsuario
                        nombre={'Jose Falconi'} 
                        rol={'Admin'}
                    />
                    <ButtonDropdown stateDropdown={handleDropdownNabvar} />
                    <Dropdown 
                        state={dropdownNabvar}
                        width={300}
                        height={150} 
                        className={'top-10 right-0 w-full bg-black'}>
                        
                        

                    </Dropdown>
                </div>
            </div>
        </nav>
    )
}

export default NavbarAdmin