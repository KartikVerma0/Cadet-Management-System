import ANO_CTO from '../models/ano_ctoSchema.js'
import Cadet from '../models/cadetSchema.js'
import Probationer from '../models/probationUser.js'
import Attendance from '../models/attendance.js'

import bcrypt from 'bcrypt'

export default async function signupController(req, res) {
    const { name, nationality, dob, fatherName, motherName, address,
        mobileNumber, email, bloodGroup, gender, nearestRailwayStation,
        nearestPoliceStation, identificationMark1, identificationMark2,
        nccUnit, nccWing, enrollmentNumber, department, rollNumber,
        academicYear, password } = req.body;

    const { role } = req.params;

    let hashedPassword = await bcrypt.hash(password, 12);


    try {

        if (role === 'ANO_CTO') {
            let newANO_CTO = new ANO_CTO({
                name,
                dob,
                mobileNumber,
                email,
                nccWing,
                hashedPassword
            })

            await newANO_CTO.save()
        } else if (role === 'CADET') {
            let newCadet = new Cadet({
                name, nationality, dob, fatherName, motherName, address,
                mobileNumber, email, bloodGroup, gender, nearestRailwayStation,
                nearestPoliceStation, identificationMark1, identificationMark2,
                nccUnit, nccWing, enrollmentNumber, department, rollNumber,
                academicYear, hashedPassword, attendanceOverallDetailsId: 0
            })

            let cadetId = newCadet._id;
            var newCadetAttendance = new Attendance({
                role,
                userId: cadetId
            })
            let attendanceOverallDetailsId = newCadetAttendance._id;
            newCadet.attendanceOverallDetailsId = attendanceOverallDetailsId;
            await newCadetAttendance.save()

            await newCadet.save()


            // make attendance document when account is approved
        } else if (role === 'PROBATION') {
            let newProbationer = new Probationer({
                name, nationality, dob, fatherName, motherName, address,
                mobileNumber, email, bloodGroup, gender, nearestRailwayStation,
                nearestPoliceStation, identificationMark1, identificationMark2,
                nccWing, department, rollNumber,
                academicYear, hashedPassword, attendanceOverallDetailsId: 0
            })

            let newProbationerId = newProbationer._id;

            // make attendance document when account is approved
            var newProbationerAttendance = new Attendance({
                role,
                userId: newProbationerId
            })
            let attendanceOverallDetailsId = newProbationerAttendance._id;
            newProbationer.attendanceOverallDetailsId = attendanceOverallDetailsId;
            await newProbationerAttendance.save()

            await newProbationer.save()

        } else {
            return res.json({ success: false, message: "No matching roles found" })
        }
        return res.json({ success: true, message: "Successfully signed up" })
    } catch (e) {
        return res.json({ success: false, message: `Problem signing up.\nError: ${e.message}` })
    }
}