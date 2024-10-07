import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',  // Agregado encabezado Accept
        // Agrega otros encabezados aquí si es necesario
    },
    withCredentials: true,
})

export default instance