import { useEffect, useState } from "react"
import CarouselCategories from "../../components/CarouselCategories"
import ButtonCategoryFilter from "../../components/UI/ButtonCategoryFilter"
import { obtenerCategoriasCliente } from "../../api/category"
import { obtenerLibrosCliente } from "../../api/book"
import ImagenSinPortada from '../../assets/images/sin_portada.jpg'
import LibroCardSelect from "../../components/UI/LibroCardSelect"

const PrincipalClient = () => {

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

    // Obtener Libros
    const [libros, setLibros] = useState([])
    useEffect(() => {
        const fetch = async () => {
            const response = await obtenerLibrosCliente(categoryFilter)
            setLibros(response.data)
        }
        fetch()
    }, [])


    return (
        <div className="flex flex-col w-full h-full">
            <CarouselCategories>
                <ButtonCategoryFilter
                    title={'Todos los libros'}
                    onClick={() => setCategoryFilter('')}
                    isSelect={categoryFilter == ''}
                />
                {categorias.map((categoria, index) => (
                    <ButtonCategoryFilter
                        key={index}
                        title={categoria.nombre}
                        onClick={() => setCategoryFilter(categoria._id)}
                        isSelect={categoria._id == categoryFilter}
                    />
                ))}
            </CarouselCategories>
            <div className="flex w-full px-4 py-2">
                <input type="text" className="w-full" />
            </div>
            
            <div className="grid gap-4 mobile:grid-cols-1 tablet:grid-cols-2 laptop-standar:grid-cols-3 laptop-large:grid-cols-4 desktop:grid-cols-5 w-full p-4">
                {libros.map((libro, index) => (
                    <LibroCardSelect
                        key={index}
                        titulo={libro.denominacion}
                        portada={libro.portada ? libro.portada : ImagenSinPortada}
                    />
                ))}
            </div>
        </div>
    )
}

export default PrincipalClient