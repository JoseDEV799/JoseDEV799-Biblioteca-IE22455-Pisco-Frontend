import axios from "./axios"

// Cliente
export const obtenerLibrosCliente = ({ idcategory = '' }) => axios.get('/cliente/book/books', {idcategory : idcategory})


// Admin
export const obtenerLibrosAdmin = () => axios.get('/admin/book/books')

export const agregarLibroAdmin = (libro) => axios.post('/admin/book/register', libro)

export const modificarLibroAdmin = (idlibro, data) => axios.post(`/admin/book/${idlibro}`, data)

export const eliminarLibroAdmin = (id) => axios.post('/admin/book/eliminar', { id: id })