import useAuth from "./useAuth.js";
import useAxiosPrivate from "./useAxiosPrivate.js";
import { useEffect, useState } from "react";

const useGetEnrolledCadets = () => {
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth({})

    const [enrolledCadets, setEnrolledCadets] = useState([])
    const [hasErrorFetchingEnrolledCadets, setHasErrorFetchingEnrolledCadets] = useState(false)
    const [hasErrorFetchingEnrolledCadetsMessage, setHasErrorFetchingEnrolledCadetsMessage] = useState('')

    const [academicYearAnalyticalData, setAcademicYearAnalyticalData] = useState([])
    const [genderAnalyticalData, setGenderAnalyticalData] = useState([])
    const [wingAnalyticalData, setWingAnalyticalData] = useState([])

    useEffect(() => {
        const getEnrolledCadets = async () => {
            try {
                const response = await axiosPrivate.get('/enrolled/cadets', {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
                if (!response) {
                    setHasErrorFetchingEnrolledCadets(true)
                    return
                }

                if (response.data.success) {
                    setEnrolledCadets(response.data.users)
                    setAcademicYearAnalyticalData(response.data.academicYearAnalyticalData)
                    setGenderAnalyticalData(response.data.genderAnalyticalData)
                    setWingAnalyticalData(response.data.wingAnalyticalData)
                } else {
                    setHasErrorFetchingEnrolledCadets(true)
                    setHasErrorFetchingEnrolledCadetsMessage(response.data.message)
                }

            } catch (err) {
                setHasErrorFetchingEnrolledCadets(true)
                setHasErrorFetchingEnrolledCadetsMessage(err)
            }
        }
        getEnrolledCadets()
    }, [])

    return {
        enrolledCadets,
        academicYearAnalyticalData,
        genderAnalyticalData,
        wingAnalyticalData,
        hasErrorFetchingEnrolledCadets,
        hasErrorFetchingEnrolledCadetsMessage
    }
}

export default useGetEnrolledCadets