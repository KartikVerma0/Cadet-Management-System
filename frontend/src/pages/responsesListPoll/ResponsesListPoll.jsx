import "./ResponsesListPoll.css";
import * as XLSX from "xlsx";
import Box from "../../components/box/Box";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        const data = pollResponses.map((pollResponse, index) => {
            return {
                "S. No.": index + 1,
                Name: pollResponse.name, Email: pollResponse.email, Wing: pollResponse.nccWing,
                "Enrollment Number": pollResponse.enrollmentNumber.toUpperCase(),
                Address: pollResponse.address, "Mobile Number": pollResponse.mobileNumber.toString(),
                Gender: pollResponse.gender, Department: pollResponse.department.toUpperCase(),
                "Roll Number": pollResponse.rollNumber.toString(), "Academic Year": pollResponse.academicYear,
                Response: pollResponse.response ? 'YES' : 'NO'
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
            {hasErrorFetchingPoll && <p className="errorMessage">{hasErrorFetchingPollMessage}</p>}
            <h1>Responses:</h1>
            {!hasErrorFetchingPollResponses ?
                <>
                    <button className='exportButton' onClick={exportData}>Export to Excel</button>
                    {pollResponses && pollResponses.length > 0 && <Table tableData={pollResponses} />}
                </>
                :
                <p className='errorMessage'>{hasErrorFetchingPollResponsesMessage}</p>
            }
        </div>
    )
}