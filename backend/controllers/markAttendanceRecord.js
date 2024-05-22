import Attendance from "../models/attendance.js";
import AttendanceRecordCadet from "../models/attendanceRecordCadet.js";
import AttendanceRecordProbation from "../models/attendanceRecordProbation.js";
import { getMonth, getYear } from "date-fns";

const markAttendanceRecord = async (req, res) => {
    const { eventID, cadetID, group, eventDate } = req.body;
    try {
        if (group === 'cadet') {
            const record = await AttendanceRecordCadet.findOne({ eventID });
            const cadetAttendanceData = await Attendance.findOne({ userId: cadetID })

            const eventYear = getYear(eventDate).toString()
            const attendanceArray = cadetAttendanceData?.attendance;
            const eventYearObject = attendanceArray?.filter((yearObject) => {
                return yearObject.year === eventYear
            })

            const eventMonthIndex = getMonth(eventDate)
            const monthlyAttendanceArray = eventYearObject[0].MonthlyAttendance;
            const eventMonthObject = monthlyAttendanceArray[eventMonthIndex]

            if (record) {
                const presentCadetsIDs = record.presentCadetsID;
                if (!presentCadetsIDs.includes(cadetID)) {
                    presentCadetsIDs.push(cadetID);
                    await record.save()
                }
            } else {
                const newRecord = new AttendanceRecordCadet({
                    eventID,
                    presentCadetsID: [cadetID]
                })
                await newRecord.save()
            }

            eventMonthObject.eventsAttended += 1;
            eventMonthObject.TotalEvents += 1;
            eventYearObject[0].TotalEvents += 1;
            eventYearObject[0].eventsAttended += 1;
            await cadetAttendanceData.save()

        } else if (group === 'probation') {
            const record = await AttendanceRecordProbation.find({ eventID });

            const cadetAttendanceData = await Attendance.findOne({ userId: cadetID })

            const eventYear = getYear(eventDate).toString()
            const attendanceArray = cadetAttendanceData?.attendance;
            const eventYearObject = attendanceArray?.filter((yearObject) => {
                return yearObject.year === eventYear
            })

            const eventMonthIndex = getMonth(eventDate)
            const monthlyAttendanceArray = eventYearObject[0].MonthlyAttendance;
            const eventMonthObject = monthlyAttendanceArray[eventMonthIndex]

            if (record) {
                const presentCadetsIDs = record.presentCadetsID;
                presentCadetsIDs.push(cadetID);
                await record.save()
            } else {
                const newRecord = new AttendanceRecordProbation({
                    eventID,
                    presentCadetsID: [cadetID]
                })

                await newRecord.save()
            }

            eventMonthObject.eventsAttended += 1;
            eventMonthObject.TotalEvents += 1;
            eventYearObject[0].TotalEvents += 1;
            eventYearObject[0].eventsAttended += 1;
            await cadetAttendanceData.save()
        }
        return res.json({ success: true, message: `Attendance marked for cadetID: ${cadetID}` })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: error.message })
    }
}

export default markAttendanceRecord;