import { Outlet } from "react-router-dom"
import Container from "../../components/Container"
import NavbarClient from "../../components/NavbarClient"
import NavbarTitle from "../../components/UI/NavbarTitle"
import LogoColegio from "../../components/UI/LogoColegio"
import NavbarUsuario from "../../components/UI/NavbarUsuario"
import ButtonTheme from "../../components/UI/ButtonTheme"


const Cliente = () => {
    return (
        <Container>
            <NavbarClient>
                <NavbarTitle
                    logo={<LogoColegio />}
                    tituloSuperior={'BIBLIOTECA DIGITAL'}
                    tituloInferior={'JOSE DE LA TORRE UGARTE'} />
                <NavbarUsuario 
                    nombre={'Jose Falconi'}
                    rol={'Administrador'}>
                    <ButtonTheme />
                </NavbarUsuario>
            </NavbarClient>
            <div className="w-full h-full bg-gray-100">
                <Outlet/>
            </div>
        </Container>
    )
}

export default Cliente