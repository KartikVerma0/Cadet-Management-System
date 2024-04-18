import AttendanceChart from '../attendanceChart/AttendanceChart'
import './AttendanceSection.css'

export default function AttendanceSection() {
    return (
        <div className='AttendanceSection'>
            <h2>Attendance</h2>
            <p>2024</p>
            <AttendanceChart />
            <section>
                <span>Drill Attendance:</span>
                <span>Other Event Attendance:</span>
                <span>Total Events:</span>
                <span>Overall Attendance Percentage:</span>
            </section>
        </div>
    )
}