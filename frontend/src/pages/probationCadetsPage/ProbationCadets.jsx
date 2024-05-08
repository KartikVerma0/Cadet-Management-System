import "./ProbationCadets.css";
import * as XLSX from "xlsx";
import Navbar from "../../components/navbar/Navbar";
import PieChart from "../../components/pieChart/PieChart";
import Table from "../../components/table/Table";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";

export default function ProbationCadets() {
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth({})
    const [probationCadets, setProbationCadets] = useState([])
    const [hasErrorFetchingProbationCadets, setHasErrorFetchingProbationCadets] = useState(false)
    const [hasErrorFetchingProbationCadetsMessage, setHasErrorFetchingProbationCadetsMessage] = useState('')

    const [academicYearAnalyticalData, setAcademicYearAnalyticalData] = useState([])
    const [genderAnalyticalData, setGenderAnalyticalData] = useState([])
    const [wingAnalyticalData, setWingAnalyticalData] = useState([])

    useEffect(() => {
        const getProbationCadets = async () => {
            try {
                const response = await axiosPrivate.get('/enrolled/probation', {
                    headers: {
                        Authorization: `BEARER ${auth.accessToken}`
                    },
                    withCredentials: true
                })
                if (!response) {
                    setHasErrorFetchingProbationCadets(true)
                    return
                }

                if (response.data.success) {
                    setProbationCadets(response.data.users)
                    setAcademicYearAnalyticalData(response.data.academicYearAnalyticalData)
                    setGenderAnalyticalData(response.data.genderAnalyticalData)
                    setWingAnalyticalData(response.data.wingAnalyticalData)
                } else {
                    setHasErrorFetchingProbationCadets(true)
                    setHasErrorFetchingProbationCadetsMessage(response.data.message)
                }

            } catch (err) {
                setHasErrorFetchingProbationCadets(true)
                setHasErrorFetchingProbationCadetsMessage(err)
            }
        }
        getProbationCadets()
    }, [])

    const exportData = () => {
        const data = probationCadets.map((user, index) => {
            return {
                "S. No.": index + 1,
                Name: user.name, Email: user.email, Wing: user.nccWing,
                Address: user.address, "Mobile Number": user.mobileNumber.toString(),
                Gender: user.gender, Department: user.department.toUpperCase(),
                "Roll Number": user.rollNumber.toString(), "Academic Year": user.academicYear
            }
        })
        const fileName = "ProbationCadets.xlsx"
        const worksheet = XLSX.utils.json_to_sheet(data)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
        const file = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(file, fileName);
    }

    return (
        <div className='ProbationCadets'>
            <Navbar loginType='logout' />
            <h1>Probation Cadets:</h1>
            {probationCadets && probationCadets.length > 0 ?
                <>
                    <div className="AnalyticSection">
                        {academicYearAnalyticalData && academicYearAnalyticalData.length > 0 && <PieChart data={academicYearAnalyticalData} />}
                        {genderAnalyticalData && genderAnalyticalData.length > 0 && <PieChart data={genderAnalyticalData} />}
                        {wingAnalyticalData && wingAnalyticalData.length > 0 && <PieChart data={wingAnalyticalData} />}
                    </div>
                    {!hasErrorFetchingProbationCadets ?
                        <>
                            {probationCadets && probationCadets.length > 0 &&
                                <>
                                    <button className='exportButton' onClick={exportData}>Export to Excel</button>
                                    <Table tableData={probationCadets} />
                                </>
                            }
                        </>
                        :
                        <p className='errorMessage'>{hasErrorFetchingProbationCadetsMessage}</p>
                    }
                </> :
                <p className='errorMessage'>No Probation cadet found!</p>
            }
        </div>
    )
}