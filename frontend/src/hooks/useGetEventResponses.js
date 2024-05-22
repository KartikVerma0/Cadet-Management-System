import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
import { useEffect, useState } from "react";

/**
 * React hook for fetching event responses associated with a specific event ID.
 *
 * Fetches event responses from the server using a protected API endpoint.
 * Handles successful responses by updating the eventResponses state.
 * Handles errors by setting the hasErrorFetchingEventResponses state and optionally providing an error message.
 *
 * @param {string} dataId - The ID of the event for which to fetch responses.
 * @returns {object} An object containing the following properties:
 *   - eventResponses: Array containing the fetched event responses (empty array if not yet fetched or on error).
 *   - hasErrorFetchingEventResponses: Boolean flag indicating if there was an error fetching responses.
 *   - hasErrorFetchingEventResponsesMessage: String containing the error message (empty string if no error).
 */
const useGetEventResponses = (dataId) => {
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth({})
    const [eventResponses, setEventResponses] = useState([])
    const [hasErrorFetchingEventResponses, setHasErrorFetchingEventResponses] = useState(false)
    const [hasErrorFetchingEventResponsesMessage, setHasErrorFetchingEventResponsesMessage] = useState('')

    useEffect(() => {
        const getEventResponses = async () => {
            try {
                const response = await axiosPrivate.get(`/response/alleventresponses?eventId=${dataId}`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
                if (!response) {
                    setHasErrorFetchingEventResponses(true)
                    return
                }

                if (response.data.success) {
                    setEventResponses(response.data.eventResponses)
                } else {
                    setHasErrorFetchingEventResponses(true)
                    setHasErrorFetchingEventResponsesMessage(response.data.message)
                }

            } catch (err) {
                setHasErrorFetchingEventResponses(true)
                setHasErrorFetchingEventResponsesMessage(err)
            }
        }
        getEventResponses()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.accessToken, dataId])

    return {
        eventResponses,
        hasErrorFetchingEventResponses,
        hasErrorFetchingEventResponsesMessage
    }

}

export default useGetEventResponses