import "./AttendanceSection.css";
import AttendanceChart from "../attendanceChart/AttendanceChart";
import useGetCadetAttendance from "../../hooks/useGetCadetAttendance";

export default function AttendanceSection() {
    const { attendanceDetails,
        totalEvents,
        totalEventsArray,
        attendedEventsArray,
        hasErrorFetchingAttendanceDetails,
        hasErrorFetchingAttendanceDetailsMessage } = useGetCadetAttendance()



    return (
        <div className='AttendanceSection'>
            <h2>Attendance</h2>
            <p>2024</p>
            {!hasErrorFetchingAttendanceDetails && attendanceDetails ?
                <>
                    <AttendanceChart attendedEventsArray={attendedEventsArray} totalEventsArray={totalEventsArray} />
                    <section>
                        <span>Attended Events: {attendanceDetails.TotalEvents}</span>
                        <span>Total Events: {totalEvents}</span>
                        <span>Overall Attendance Percentage: {((attendanceDetails.eventsAttended / totalEvents) * 100).toFixed(2)}%</span>
                    </section>
                </>
                :
                <p className="errorMessage">{hasErrorFetchingAttendanceDetailsMessage}</p>
            }
        </div>
    )
}