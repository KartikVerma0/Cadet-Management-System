import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
import { useEffect, useState } from "react";

/**
 * React hook for fetching poll responses associated with a specific poll ID.
 *
 * Fetches poll responses from the server using a protected API endpoint.
 * Handles successful responses by updating the pollResponses state with the fetched data.
 * Handles errors by setting the hasErrorFetchingPollResponses state and optionally providing an error message.
 *
 * @param {string} dataId - The ID of the poll for which to fetch responses.
 * @returns {object} An object containing the following properties:
 *   - pollResponses: Array containing the fetched poll responses (empty array if not yet fetched or on error).
 *   - hasErrorFetchingPollResponses: Boolean flag indicating if there was an error fetching responses.
 *   - hasErrorFetchingPollResponsesMessage: String containing the error message (empty string if no error).
 */
const useGetPollResponses = (dataId) => {
    const { auth } = useAuth({})
    const axiosPrivate = useAxiosPrivate()
    const [pollResponses, setPollResponses] = useState([])
    const [hasErrorFetchingPollResponses, setHasErrorFetchingPollResponses] = useState(false)
    const [hasErrorFetchingPollResponsesMessage, setHasErrorFetchingPollResponsesMessage] = useState('')

    useEffect(() => {
        const getPollResponses = async () => {
            try {
                const response = await axiosPrivate.get(`/response/allpollresponses?pollId=${dataId}`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
                if (!response) {
                    setHasErrorFetchingPollResponses(true)
                    return
                }

                if (response.data.success) {
                    setPollResponses(response.data.pollResponses)
                } else {
                    setHasErrorFetchingPollResponses(true)
                    setHasErrorFetchingPollResponsesMessage(response.data.message)
                }

            } catch (err) {
                setHasErrorFetchingPollResponses(true)
                setHasErrorFetchingPollResponsesMessage(err)
            }
        }
        getPollResponses()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.accessToken, dataId])

    return {
        pollResponses,
        hasErrorFetchingPollResponses,
        hasErrorFetchingPollResponsesMessage
    }

}

export default useGetPollResponses