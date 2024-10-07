import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',  // Agregado encabezado Accept
    },
    withCredentials: true,
})

export default instance