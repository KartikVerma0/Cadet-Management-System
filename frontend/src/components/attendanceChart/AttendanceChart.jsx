import "./AttendanceChart.css";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale, LinearScale,
    BarElement, Title,
    Tooltip, Legend
} from 'chart.js'


ChartJS.register(
    CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
)

export default function AttendanceChart({ attendedEventsArray, totalEventsArray }) {

    const data = []
    for (let month = 0; month < 12; month++) {
        if (totalEventsArray[month] > 0) {
            data[month] = (attendedEventsArray[month] / totalEventsArray[month]) * 100
        }
    }
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

AttendanceChart.propTypes = {
    attendedEventsArray: PropTypes.array,
    totalEventsArray: PropTypes.array
}