import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale, LinearScale,
    BarElement, Title,
    Tooltip, Legend
} from 'chart.js'

import './AttendanceChart.css'

ChartJS.register(
    CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
)

export default function AttendanceChart() {

    const data = [90, 50, 75, 95, 65, 80, 45, 70, 90, 73, 95, 85]
    const backgroundColor = () => {
        return data.map((attendancePercentage) => {
            if (attendancePercentage >= 75 && attendancePercentage <= 100) {
                return "rgba(65,173,73,1)"
            } else if (attendancePercentage > 50) {
                return "rgba(248,151,40,1)"
            } else if (attendancePercentage >= 0 && attendancePercentage <= 50) {
                return "rgba(179,35,23,1)"
            } else {
                return "blue"
            }
        })
    }

    const dataSet = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
            {
                label: "Attendance Percentage",
                data: data,
                backgroundColor: backgroundColor,
            }
        ]
    }

    return (
        <div className='AttendanceChart'>
            <Bar data={dataSet}></Bar>
        </div>
    )
}