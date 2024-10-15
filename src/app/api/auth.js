import axios from './axios'

export const registerUser = user => axios.post('register', user)

export const loginRequest = user => axios.post('/login', user)

export const logoutRequest = token => axios.post('logout', token)

export const profileUserRequest = token => axios.get('profile', token) 

export const verifyTokenRequest = async () => axios.get('verify')
// export const updateUser = user => axios.post('/udpate', user)

// export const deleteUser = user => axios.post('/delete', user)