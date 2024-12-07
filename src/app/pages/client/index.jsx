import { Outlet, useNavigate } from "react-router-dom"
import Container from "../../components/Container"
import NavbarClient from "../../components/NavbarClient"
import NavbarTitle from "../../components/UI/NavbarTitle"
import LogoColegio from "../../components/UI/LogoColegio"
import NavbarUsuario from "../../components/UI/NavbarUsuario"
import ButtonTheme from "../../components/UI/ButtonTheme"
import SearchBooksClient from "../../components/UI/SearchBooksClient"
import { useEffect, useState } from "react"
import { obtenerLibrosCliente } from "../../api/book"


const Cliente = () => {

    const navigate = useNavigate()

    const [categoryFilter, setCategoryFilter] = useState('')
    const [libros, setLibros] = useState([])
    useEffect(() => {
        const fetch = async () => {
            const response = await obtenerLibrosCliente(categoryFilter)
            setLibros(response.data)
        }
        fetch()
    }, [])

    const handleLibroSearch = (row) => {
        navigate(`/${row.denominacion}`)
    }

    return (
        <Container>
            <NavbarClient>
                <NavbarTitle
                    logo={<LogoColegio />}
                    tituloSuperior={'BIBLIOTECA DIGITAL'}
                    tituloInferior={'JOSE DE LA TORRE UGARTE'} 
                />

                <SearchBooksClient
                    className={`max-laptop-large:hidden laptop-large:w-2/3 desktop:w-1/2`}
                    valueFilter={['denominacion', 'autor']}
                    placeholder={'¿Qué libro estas buscando?'}
                    row={libros}
                    onClick={handleLibroSearch}
                />

                <NavbarUsuario
                    nombre={'Jose Falconi'}
                    rol={'Administrador'}>
                    {/* <ButtonTheme /> */}
                </NavbarUsuario>
            </NavbarClient>
            <div className="w-full h-full bg-gray-50">
                <Outlet />
            </div>
        </Container>
    )
}

export default Cliente