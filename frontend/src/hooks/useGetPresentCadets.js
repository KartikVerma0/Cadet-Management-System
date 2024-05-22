import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
import { useEffect, useState } from "react";

const useGetPresentCadets = (dataId, group) => {
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()

    const [presentCadets, setPresentCadets] = useState([])
    const [hasErrorFetchingPresentCadets, setHasErrorFetchingPresentCadets] = useState(false)
    const [hasErrorFetchingPresentCadetsMessage, setHasErrorFetchingPresentCadetsMessage] = useState(false)
    useEffect(() => {
        const getPresentCadets = async () => {
            try {
                const response = await axiosPrivate.get(`/attendance?eventID=${dataId}&group=${group}`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
                if (!response) {
                    setHasErrorFetchingPresentCadets(true)
                    return
                }

                if (response.data.success) {
                    setPresentCadets(response.data.attendanceRecord.presentCadetsID)
                } else {
                    setHasErrorFetchingPresentCadets(true)
                    setHasErrorFetchingPresentCadetsMessage(response.data.message)
                }

            } catch (err) {
                setHasErrorFetchingPresentCadets(true)
                setHasErrorFetchingPresentCadetsMessage(err)
            }
        }
        getPresentCadets()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.accessToken, dataId, group])

    return {
        presentCadets,
        setPresentCadets,
        hasErrorFetchingPresentCadets,
        hasErrorFetchingPresentCadetsMessage
    }
}
export default useGetPresentCadets