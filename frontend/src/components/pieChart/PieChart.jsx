import "./PieChart.css";
import Chart from "chart.js/auto";
import PropTypes from "prop-types";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Pie } from "react-chartjs-2";

Chart.register(CategoryScale);

export default function PieChart({ data }) {
    const labelKey = Object.keys(data[0])
    const labelGroup = labelKey.includes('academicYear') ? 'academicYear' : labelKey.includes('gender') ? 'gender' : labelKey.includes('nccWing') ? 'nccWing' : ''
    const valueGroup = labelKey.includes('count') ? 'count' : ''
    const labels = data.map((info) => {
        return info[labelGroup]
    })
    const values = data.map((info) => {
        return info[valueGroup]
    })
    const colors = ["#1A4D2E", "#4F6F52", "#E8DFCA", "#F5EFE6"]
    const [chartData, setChartData] = useState({
        labels: labels,
        datasets: [
            {
                label: "Users Gained ",
                data: values,
                backgroundColor: colors,
                borderWidth: 0
            }
        ]
    });

    return (
        <div className="PieChart">
            <p>{labelGroup.toUpperCase()}</p>
            <Pie
                data={chartData}
            />
        </div>
    );
}

PieChart.propTypes = {
    data: PropTypes.object
}