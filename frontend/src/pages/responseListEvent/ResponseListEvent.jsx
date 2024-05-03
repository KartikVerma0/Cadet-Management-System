import "./ResponseListEvent.css";
import * as XLSX from "xlsx";
import Box from "../../components/box/Box";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        const data = eventResponses.map((eventResponse, index) => {
            return {
                "S. No.": index + 1,
                Name: eventResponse.name, Email: eventResponse.email, Wing: eventResponse.nccWing,
                "Enrollment Number": eventResponse.enrollmentNumber.toUpperCase(),
                Address: eventResponse.address, "Mobile Number": eventResponse.mobileNumber.toString(),
                Gender: eventResponse.gender, Department: eventResponse.department.toUpperCase(),
                "Roll Number": eventResponse.rollNumber.toString(), "Academic Year": eventResponse.academicYear,
                Response: eventResponse.response ? 'YES' : 'NO'
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
                    <button className='exportButton' onClick={exportData}>Export to Excel</button>
                    {eventResponses && eventResponses.length > 0 && <Table tableData={eventResponses} />}
                </>
                :
                <p className='errorMessage'>{hasErrorFetchingEventResponsesMessage}</p>
            }
        </div>
    )
}