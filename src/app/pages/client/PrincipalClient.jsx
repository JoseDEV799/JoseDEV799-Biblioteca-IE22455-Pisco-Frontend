import { useEffect, useState } from "react"
import CarouselCategories from "../../components/CarouselCategories"
import ButtonCategoryFilter from "../../components/UI/ButtonCategoryFilter"
import { obtenerCategoriasCliente } from "../../api/category"
import { obtenerLibrosCliente, obtenerLibrosPorCategoria } from "../../api/book"
import ImagenSinPortada from '../../assets/images/sin_portada.jpg'
import LibroCardSelect from "../../components/UI/LibroCardSelect"
import SearchBooksClient from "../../components/UI/SearchBooksClient"
import { useNavigate } from 'react-router-dom'
import ButtonTheme from "../../components/UI/ButtonTheme"
import CarouselBooks from "../../components/CarouselBooks"


const PrincipalClient = () => {

    const navigate = useNavigate()

    // Filtrar categoria
    const [categoryFilter, setCategoryFilter] = useState('')

    // Obtener Categorias
    const [categorias, setCategorias] = useState([])
    useEffect(() => {
        const fetch = async () => {
            const response = await obtenerCategoriasCliente()
            setCategorias(response.data)
        }
        fetch()
    }, [])

    // Obtener libros para el buscador
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

    const [librosPorCategoria, setLibrosPorCategoria] = useState([])
    useEffect(() => {
        const fetch = async () => {
            const response = await obtenerLibrosPorCategoria()
            setLibrosPorCategoria(response.data)
        }
        fetch()
    }, [])

    return (
        <div className="flex flex-col w-full h-full mb-4">
            <CarouselCategories>
                <ButtonCategoryFilter
                    title={'Todos'}
                    color={'#fcd34d'}
                    onClick={() => setCategoryFilter('')}
                    isSelect={categoryFilter == ''}
                />
                {categorias.map((categoria, index) => (
                    <ButtonCategoryFilter
                        key={index}
                        title={categoria.nombre}
                        color={categoria.color}
                        onClick={() => setCategoryFilter(categoria._id)}
                        isSelect={categoria._id == categoryFilter}
                    />
                ))}
            </CarouselCategories>
            <div className="flex w-full px-4 py-4 bg-gray-100 laptop-standar:hidden">
                <SearchBooksClient
                    className={'laptop-large:hidden w-full'}
                    valueFilter={['denominacion', 'autor']}
                    placeholder={'¿Qué libro estas buscando?'}
                    row={libros}
                    onClick={handleLibroSearch}
                />
                {/* <ButtonTheme /> */}
            </div>
            <div className="flex flex-col w-full h-full px-4 bg-[#354959]/2 pt-4 space-y-4 overflow-y-auto shadow-inner">
                {librosPorCategoria.map((categoria, index) => (
                    <CarouselBooks titleCarousel={categoria.categoria} color={categoria.color} key={index}>
                        {categoria.libros.map((libro, index)=>(
                            <LibroCardSelect key={index} 
                                titulo={libro.denominacion}
                                autor={libro.autor}
                                portada={libro.portada}
                            />
                        ))}
                    </CarouselBooks>
                ))}
            </div>
        </div>
    )
}

export default PrincipalClient