import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
import { useEffect, useState } from "react";

/**
 * React hook for fetching poll information associated with a specific poll ID.
 *
 * Fetches poll details from the server using a protected API endpoint.
 * Handles successful responses by updating the pollInfo state with the fetched data.
 * Handles errors by setting the hasErrorFetchingPoll state and optionally providing an error message.
 *
 * @param {string} dataId - The ID of the poll for which to fetch data.
 * @returns {object} An object containing the following properties:
 *   - pollInfo: Object containing the fetched poll information (null if not yet fetched or on error).
 *   - hasErrorFetchingPoll: Boolean flag indicating if there was an error fetching poll data.
 *   - hasErrorFetchingPollMessage: String containing the error message (empty string if no error).
 */
const useGetPollData = (dataId) => {
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth({})
    const [pollInfo, setPollInfo] = useState()
    const [hasErrorFetchingPoll, setHasErrorFetchingPoll] = useState(false)
    const [hasErrorFetchingPollMessage, setHasErrorFetchingPollMessage] = useState('')
    useEffect(() => {
        const getPoll = async () => {
            try {
                const response = await axiosPrivate.get(`/polldata?pollId=${dataId}`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
                if (!response) {
                    setHasErrorFetchingPoll(true)
                    return
                }
                if (response.data.success) {
                    setPollInfo(response.data.pollInfo)
                } else {
                    setHasErrorFetchingPoll(true)
                    setHasErrorFetchingPollMessage(response.data.message)
                }

            } catch (err) {
                setHasErrorFetchingPoll(true)
                setHasErrorFetchingPollMessage(err)
            }
        }
        getPoll()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.accessToken, dataId])

    return {
        pollInfo,
        hasErrorFetchingPoll,
        hasErrorFetchingPollMessage
    }
}
export default useGetPollData