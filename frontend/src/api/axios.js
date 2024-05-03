import axios from "axios";

export default axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_STRING
})

export const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_STRING,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})