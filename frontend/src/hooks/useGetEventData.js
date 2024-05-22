import useAuth from "./useAuth.js";
import useAxiosPrivate from "./useAxiosPrivate.js";
import { useEffect, useState } from "react";

const useGetEventData = (eventId) => {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const [eventInfo, setEventInfo] = useState({})
    const [hasErrorFetchingEvent, setHasErrorFetchingEvent] = useState(false)
    const [hasErrorFetchingEventMessage, setHasErrorFetchingEventMessage] = useState('')


    useEffect(() => {
        const getEvent = async () => {
            try {
                const response = await axiosPrivate.get(`/eventdata?eventId=${eventId}`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
                if (!response) {
                    setHasErrorFetchingEvent(true)
                    return
                }
                if (response.data.success) {
                    setEventInfo(response.data.eventInfo)
                } else {
                    setHasErrorFetchingEvent(true)
                    setHasErrorFetchingEventMessage(response.data.message)
                }

            } catch (err) {
                setHasErrorFetchingEventMessage(err)
                setHasErrorFetchingEvent(true)
            }
        }
        getEvent()

    }, [])

    return {
        eventInfo,
        hasErrorFetchingEvent,
        hasErrorFetchingEventMessage
    }
}

export default useGetEventData