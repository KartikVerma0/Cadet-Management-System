import Navbar from '../../components/navbar/Navbar'
import Box from '../../components/box/Box'
import { useParams } from 'react-router-dom'
import './ResponsesListPoll.css'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'

import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export default function ResponsesListPoll() {
    const axiosPrivate = useAxiosPrivate()
    const { dataId } = useParams()
    const { auth } = useAuth({})
    const [pollInfo, setPollInfo] = useState()
    const [hasErrorFetchingPoll, sethasErrorFetchingPoll] = useState(false)
    const [hasErrorFetchingPollMessage, sethasErrorFetchingPollMessage] = useState('')
    const [pollResponses, setpollResponses] = useState([])
    const [hasErrorFetchingPollResponses, sethasErrorFetchingPollResponses] = useState(false)
    const [hasErrorFetchingPollResponsesMessage, sethasErrorFetchingPollResponsesMessage] = useState('')
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
                    sethasErrorFetchingPoll(true)
                    return
                }
                if (response.data.success) {
                    setPollInfo(response.data.pollInfo)
                } else {
                    sethasErrorFetchingPoll(true)
                    sethasErrorFetchingPollMessage(response.data.message)
                }

            } catch (err) {
                sethasErrorFetchingPoll(true)
                sethasErrorFetchingPollMessage(err)
            }
        }
        getPoll()

    }, [])

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
                    sethasErrorFetchingPollResponses(true)
                    return
                }

                if (response.data.success) {
                    setpollResponses(response.data.pollResponses)
                } else {
                    sethasErrorFetchingPollResponses(true)
                    sethasErrorFetchingPollResponsesMessage(response.data.message)
                }

            } catch (err) {
                sethasErrorFetchingPollResponses(true)
                sethasErrorFetchingPollResponsesMessage(err)
            }
        }
        getPollResponses()
    }, [])

    const exportData = () => {
        // console.log(pollResponses)
        const data = pollResponses.map((pollResponse) => {
            return {
                name: pollResponse.name, email: pollResponse.email, wing: pollResponse.nccWing, enrollmentNumber: pollResponse.enrollmentNumber, address: pollResponse.address, mobileNumber: pollResponse.mobileNumber.toString(),
                gender: pollResponse.gender, department: pollResponse.department,
                rollNumber: pollResponse.rollNumber.toString(), academicYear: pollResponse.academicYear, response: pollResponse.response ? 'YES' : 'NO'
            }
        })
        const fileName = "PollResponse.xlsx"
        const worksheet = XLSX.utils.json_to_sheet(data)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
        const file = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(file, fileName);
    }

    return (
        <div className='ResponsesListPoll'>
            <Navbar loginType='logout' />
            {pollInfo && !hasErrorFetchingPoll && <Box info={pollInfo} section={'polls'} showResponseLink={false} />}
            {hasErrorFetchingPoll && <p>{hasErrorFetchingPollMessage}</p>}
            <h1>Responses:</h1>
            {!hasErrorFetchingPollResponses ?
                <>
                    {/* <a href=""> */}
                    <button className='exportButton' onClick={exportData}>Export to Excel</button>
                    {/* </a> */}
                    <table>
                        <thead>
                            <tr className='headingRow'>
                                <th className='redGradient'>S. No.</th>
                                <th className='darkBlueGradient'>Name</th>
                                <th className='lightBlueGradient'>Wing</th>
                                <th className='redGradient'>Enrollment No.</th>
                                <th className='darkBlueGradient'>Email</th>
                                <th className='lightBlueGradient'>Response</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pollResponses.map((pollResponse, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{pollResponse.name}</td>
                                    <td>{pollResponse.nccWing}</td>
                                    <td>{pollResponse.enrollmentNumber}</td>
                                    <td>{pollResponse.email}</td>
                                    <td className={pollResponse.response ? 'font-green' : 'font-red'}>{pollResponse.response ? 'YES' : 'NO'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
                :
                <p className='errorMessage'>{hasErrorFetchingPollResponsesMessage}</p>
            }
        </div>
    )
}