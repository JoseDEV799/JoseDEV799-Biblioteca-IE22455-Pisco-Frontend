import { useState } from "react"
import Dropdown from "./Dropdown"
import ButtonDropdown from "./UI/ButtonDropdown"
import LogoColegio from "./UI/LogoColegio"
import NavbarTitle from "./UI/NavbarTitle"
import NavbarUsuario from "./UI/NavbarUsuario"


const NavbarClient = ({ children }) => {
    return (
        <>
            <nav className={`grid grid-cols-3 bg-[#137FD9] relative`}>
                {children}
            </nav>
        </>
    )
}

export default NavbarClient