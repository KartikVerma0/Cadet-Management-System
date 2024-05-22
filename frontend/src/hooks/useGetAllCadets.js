import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
import { useEffect, useState } from "react";

const useGetAllCadets = () => {
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()

    const [allCadets, setAllCadets] = useState([])
    const [hasErrorFetchingAllCadets, setHasErrorFetchingAllCadets] = useState(false)
    const [hasErrorFetchingAllCadetsMessage, setHasErrorFetchingAllCadetsMessage] = useState(false)
    useEffect(() => {
        const getAllCadets = async () => {
            try {
                const response = await axiosPrivate.get(`/allCadets`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
                if (!response) {
                    setHasErrorFetchingAllCadets(true)
                    return
                }

                if (response.data.success) {
                    setAllCadets(response.data.cadets)
                } else {
                    setHasErrorFetchingAllCadets(true)
                    setHasErrorFetchingAllCadetsMessage(response.data.message)
                }

            } catch (err) {
                setHasErrorFetchingAllCadets(true)
                setHasErrorFetchingAllCadetsMessage(err)
            }
        }
        getAllCadets()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.accessToken])

    return {
        allCadets,
        setAllCadets,
        hasErrorFetchingAllCadets,
        hasErrorFetchingAllCadetsMessage
    }
}
export default useGetAllCadets