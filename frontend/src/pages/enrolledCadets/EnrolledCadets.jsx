import "./EnrolledCadets.css";
import * as XLSX from "xlsx";
import Navbar from "../../components/navbar/Navbar";
import PieChart from "../../components/pieChart/PieChart";
import Table from "../../components/table/Table";
import useGetEnrolledCadets from "../../hooks/useGetEnrolledCadets";
import { saveAs } from "file-saver";

export default function EnrolledCadets() {

    const {
        enrolledCadets,
        academicYearAnalyticalData,
        genderAnalyticalData,
        wingAnalyticalData,
        hasErrorFetchingEnrolledCadets,
        hasErrorFetchingEnrolledCadetsMessage
    } = useGetEnrolledCadets()


    const exportData = () => {
        const data = enrolledCadets.map((cadet, index) => {
            return {
                "S. No.": index + 1,
                Name: cadet.name, Email: cadet.email, Wing: cadet.nccWing,
                "Enrollment Number": cadet.enrollmentNumber.toUpperCase(),
                Address: cadet.address, "Mobile Number": cadet.mobileNumber.toString(),
                Gender: cadet.gender, Department: cadet.department.toUpperCase(),
                "Roll Number": cadet.rollNumber.toString(), "Academic Year": cadet.academicYear
            }
        })
        const fileName = "EnrolledCadets.xlsx"
        const worksheet = XLSX.utils.json_to_sheet(data)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
        const file = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(file, fileName);
    }

    return (
        <div className='EnrolledCadets'>
            <Navbar loginType='logout' />
            <h1>Enrolled Cadets:</h1>
            {enrolledCadets && enrolledCadets.length > 0 ?
                <>
                    <div className="AnalyticSection">
                        {academicYearAnalyticalData && academicYearAnalyticalData.length > 0 && <PieChart data={academicYearAnalyticalData} />}
                        {genderAnalyticalData && genderAnalyticalData.length > 0 && <PieChart data={genderAnalyticalData} />}
                        {wingAnalyticalData && wingAnalyticalData.length > 0 && <PieChart data={wingAnalyticalData} />}
                    </div>
                    {!hasErrorFetchingEnrolledCadets ?
                        <>
                            {enrolledCadets && enrolledCadets.length > 0 &&
                                <>
                                    <button className='exportButton' onClick={exportData}>Export to Excel</button>
                                    <Table tableData={enrolledCadets} />
                                </>}
                        </>
                        :
                        <p className='errorMessage'>{hasErrorFetchingEnrolledCadetsMessage}</p>
                    }
                </> :
                <p className='errorMessage'>No Enrolled cadet found!</p>
            }
        </div>
    )
}