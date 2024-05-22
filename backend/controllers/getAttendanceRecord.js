import AttendanceRecordCadet from "../models/attendanceRecordCadet.js";
import AttendanceRecordProbation from "../models/attendanceRecordProbation.js";

const getAttendanceRecord = async (req, res) => {
    const { eventID, group } = req.query;
    let attendanceRecord = undefined;
    try {
        if (group === "cadet") {
            attendanceRecord = await AttendanceRecordCadet.findOne({ eventID }).populate("presentCadetsID")
        } else if (group === "probation") {
            attendanceRecord = await AttendanceRecordProbation.findOne({ eventID }).populate("presentCadetsID")
        }
    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }
    if (attendanceRecord?.presentCadetsID?.length) {
        return res.json({ success: true, attendanceRecord })
    }
    return res.json({ success: false, message: "No attendance found" })

}

export default getAttendanceRecord