import Navbar from '../../components/navbar/Navbar'
import Box from '../../components/box/Box'
import { useParams } from 'react-router-dom'
import './ResponseListEvent.css'
import { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'

import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export default function ResponsesListEvent() {
    const axiosPrivate = useAxiosPrivate()
    const { dataId } = useParams()
    const { auth } = useAuth({})
    const [eventInfo, setEventInfo] = useState()
    const [hasErrorFetchingEvent, sethasErrorFetchingEvent] = useState(false)
    const [hasErrorFetchingEventMessage, sethasErrorFetchingEventMessage] = useState('')
    const [eventResponses, setEventResponses] = useState([])
    const [hasErrorFetchingEventResponses, sethasErrorFetchingEventResponses] = useState(false)
    const [hasErrorFetchingEventResponsesMessage, sethasErrorFetchingEventResponsesMessage] = useState('')
    useEffect(() => {
        const getEvent = async () => {
            try {
                const response = await axiosPrivate.get(`/eventdata?eventId=${dataId}`, {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
                if (!response) {
                    sethasErrorFetchingEvent(true)
                    return
                }
                if (response.data.success) {
                    setEventInfo(response.data.eventInfo)
                } else {
                    sethasErrorFetchingEvent(true)
                    sethasErrorFetchingEventMessage(response.data.message)
                }

            } catch (err) {
                sethasErrorFetchingEvent(true)
                sethasErrorFetchingEventMessage(err)
            }
        }
        getEvent()

    }, [])

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
                    sethasErrorFetchingEventResponses(true)
                    return
                }

                if (response.data.success) {
                    setEventResponses(response.data.eventResponses)
                } else {
                    sethasErrorFetchingEventResponses(true)
                    sethasErrorFetchingEventResponsesMessage(response.data.message)
                }

            } catch (err) {
                sethasErrorFetchingEventResponses(true)
                sethasErrorFetchingEventResponsesMessage(err)
            }
        }
        getEventResponses()
    }, [])

    const exportData = () => {
        const data = eventResponses.map((eventResponse) => {
            return {
                name: eventResponse.name, email: eventResponse.email, wing: eventResponse.nccWing, enrollmentNumber: eventResponse.enrollmentNumber, address: eventResponse.address, mobileNumber: eventResponse.mobileNumber.toString(),
                gender: eventResponse.gender, department: eventResponse.department,
                rollNumber: eventResponse.rollNumber.toString(), academicYear: eventResponse.academicYear, response: eventResponse.response ? 'YES' : 'NO'
            }
        })
        const fileName = "EventResponse.xlsx"
        const worksheet = XLSX.utils.json_to_sheet(data)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
        const file = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(file, fileName);
    }

    return (
        <div className='ResponsesListEvent'>
            <Navbar loginType='logout' />
            {eventInfo && !hasErrorFetchingEvent && <Box info={eventInfo} section={'events'} showResponseLink={false} />}
            {hasErrorFetchingEvent && <p>{hasErrorFetchingEventMessage}</p>}
            <h1>Responses:</h1>
            {!hasErrorFetchingEventResponses ?
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
                            {eventResponses.map((eventResponse, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{eventResponse.name}</td>
                                    <td>{eventResponse.nccWing}</td>
                                    <td>{eventResponse.enrollmentNumber}</td>
                                    <td>{eventResponse.email}</td>
                                    <td className={eventResponse.response ? 'font-green' : 'font-red'}>{eventResponse.response ? 'YES' : 'NO'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
                :
                <p className='errorMessage'>{hasErrorFetchingEventResponsesMessage}</p>
            }
        </div>
    )
}