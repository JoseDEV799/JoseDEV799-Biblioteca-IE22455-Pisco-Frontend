import axios from "./axios"

export const obtenerCategoriasCliente = () => axios.get('/client/category/categories')


// Admin
export const obtenerCategoriasAdmin = () => axios.get('/admin/category/categories') 

export const crearCategoriaAdmin = (categoria) => axios.post('/admin/category/register', categoria)

export const modificarCategoriaAdmin = (id, data) => axios.post(`/admin/category/update/${id}`, data)

export const eliminarCategoriaAdmin = (id) => axios.post('/admin/category/eliminar', { id: id})