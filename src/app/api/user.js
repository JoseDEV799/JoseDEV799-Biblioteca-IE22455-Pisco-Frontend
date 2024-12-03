import axios from './axios'

// Admin
export const obtenerUsuarios = () => axios.get('/admin/user/users')

export const registrarUsuario = user => axios.post('/admin/user/register', user)

export const modificarUsuario = (id, data) => axios.post(`/admin/user/update/${id}`, data)

export const eliminarUsuario = (id) => axios.post('/admin/user/eliminar', { id: id })

export const cambiarContraseñaUsuario = (data) => axios.post('/admin/user/change/password', data)

// export const loginRequest = user => axios.post('/login', user)

// export const logoutRequest = token => axios.post('logout', token)

// export const profileUserRequest = token => axios.get('profile', token) 

// export const verifyTokenRequest = async () => axios.get('verify')
// // export const updateUser = user => axios.post('/udpate', user)

// // export const deleteUser = user => axios.post('/delete', user)