import useAuth from "./useAuth.js";
import useAxiosPrivate from "./useAxiosPrivate.js";
import { useEffect, useState } from "react";

const useGetCadetAttendance = () => {
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth({})

    const [attendanceDetails, setAttendanceDetails] = useState({})
    const [totalEventsArray, setTotalEventsArray] = useState([])
    const [attendedEventsArray, setAttendedEventsArray] = useState([])
    const [totalEvents, setTotalEvents] = useState(0)
    const [hasErrorFetchingAttendanceDetails, setHasErrorFetchingAttendanceDetails] = useState(false)
    const [hasErrorFetchingAttendanceDetailsMessage, setHasErrorFetchingAttendanceDetailsMessage] = useState('')

    const sum = (array) => {
        let sum = 0;
        array.forEach(element => {
            sum += element
        });
        return sum
    }


    const makeAttendedEventsArray = (array) => {
        let attendedEventsCountArray = [];
        array.forEach((element, index) => {
            attendedEventsCountArray[index] = element.eventsAttended
        })
        return attendedEventsCountArray;
    }

    useEffect(() => {
        const getAttendanceDetails = async () => {
            try {
                const response = await axiosPrivate.get(`/cadet/attendance?cadetID=${auth.id}`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
                if (!response) {
                    setHasErrorFetchingAttendanceDetails(true)
                    return
                }

                if (response.data.success) {
                    setAttendanceDetails(response.data.attendanceDetails)
                    setAttendedEventsArray(makeAttendedEventsArray(response.data.attendanceDetails?.MonthlyAttendance))
                    setTotalEvents(sum(response.data.eventsInYear))
                    setTotalEventsArray(response.data.eventsInYear)
                } else {
                    setHasErrorFetchingAttendanceDetails(true)
                    setHasErrorFetchingAttendanceDetailsMessage(response.data.message)
                }

            } catch (err) {
                setHasErrorFetchingAttendanceDetails(true)
                setHasErrorFetchingAttendanceDetailsMessage(err)
            }
        }
        getAttendanceDetails()
    }, [])

    return {
        attendanceDetails,
        totalEvents,
        totalEventsArray,
        attendedEventsArray,
        hasErrorFetchingAttendanceDetails,
        hasErrorFetchingAttendanceDetailsMessage
    }
};
export default useGetCadetAttendance;
