import Attendance from "../models/attendance.js";
import Event from "../models/event.js";

const getCadetAttendance = async (req, res) => {
    const { cadetID } = req.query;
    let attendanceRecord = undefined;
    try {
        attendanceRecord = await Attendance.findOne({ userId: cadetID })
    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }

    const currentYear = new Date().getFullYear().toString()
    const attendanceArray = attendanceRecord?.attendance;
    const currentYearObject = attendanceArray?.filter((yearObject) => {
        return yearObject.year === currentYear
    })

    let eventsInYear = []
    for (let month = 1; month <= 12; month++) {
        let firstDate = `${month}-01-${currentYear}`
        let lastDate = month === 2 ? `${month}-29-${currentYear}` : `${month}-31-${currentYear}`

        const eventsWithinMonth = await Event.find({ date: { $gte: firstDate, $lte: lastDate } })
        eventsInYear[month - 1] = eventsWithinMonth?.length
    }
    if (currentYearObject && currentYearObject[0]) {
        return res.json({ success: true, attendanceDetails: currentYearObject[0], eventsInYear })
    }
    return res.json({ success: false, message: "Error fetching attendance" })
}

export default getCadetAttendance;