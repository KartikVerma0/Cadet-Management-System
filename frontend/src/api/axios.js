import axios from 'axios'
import { BACKEND_BASE_STRING } from '../env.js'

export default axios.create({
    baseURL: BACKEND_BASE_STRING
})

export const axiosPrivate = axios.create({
    baseURL: BACKEND_BASE_STRING,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})