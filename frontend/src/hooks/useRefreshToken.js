import axios from '../api/axios.js'
import useAuth from "./useAuth.js";


const useRefreshToken = () => {
    const { auth, setAuth } = useAuth()
    const refresh = async () => {

        try {
            const response = await axios.get(`/refresh/${auth.role}`, {
                withCredentials: true
            })
            setAuth(prev => {
                return { ...prev, accessToken: response.data.accessToken }
            })

            return response.data.accessToken
        } catch {
            return
        }
    }

    return refresh
}

export default useRefreshToken