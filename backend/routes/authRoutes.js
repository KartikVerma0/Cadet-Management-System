import express from 'express'

import ANO_CTO from '../models/ano_ctoSchema.js'
import Cadet from '../models/cadetSchema.js'
import Probationer from '../models/probationUser.js'
import Attendance from '../models/attendance.js'

import bcrypt from 'bcrypt'

import { generateAccessToken, generateRefreshToken, handleLogout } from '../utils/authToken.js'
const router = express.Router();

router.post("/signup/:role", async (req, res) => {
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
})

router.post('/login/:role', async (req, res) => {
    const { email, password } = req.body
    const { role } = req.params

    if (role === 'ANO_CTO') {
        let ano_cto = undefined
        try {
            ano_cto = await ANO_CTO.findOne({ email })
            if (!ano_cto) {
                return res.json({ success: false, message: "Username/Password combination incorrect" })
            }
        } catch (err) {
            return res.json({ success: false, message: "Username/Password combination incorrect" })
        }
        try {
            const isValidUser = await bcrypt.compare(password, ano_cto.hashedPassword)
            if (!isValidUser) {
                return res.json({ success: false, message: "Username/Password combination incorrect" })
            }
            const accessToken = generateAccessToken(ano_cto)
            const refreshToken = generateRefreshToken(ano_cto)
            try {
                ano_cto.refreshToken = refreshToken;
                await ano_cto.save()
            } catch (err) {
                return res.json({ success: false, message: "Problem loggin In" })
            }

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: 60 * 60 * 1000
            })

            const additionalInfo = {
                name: ano_cto.name,
                mobileNumber: ano_cto.mobileNumber,
                email: ano_cto.email,
                nccWing: ano_cto.nccWing,
                permissions: ano_cto.permissions,
                accountApproved: ano_cto.accountApproved,
                role: 'ANO_CTO'
            }

            return res.json({ success: true, message: "Successfully logged In", accessToken, additionalInfo })
        } catch (err) {
            return res.json({ success: false, message: "Problem loggin In" })
        }

    } else if (role === 'CADET') {
        let cadet = undefined
        try {
            cadet = await Cadet.findOne({ email })
            if (!cadet) {
                return res.json({ success: false, message: "Username/Password combination incorrect" })
            }
        } catch (err) {
            return res.json({ success: false, message: "Username/Password combination incorrect" })
        }
        try {
            const isValidUser = await bcrypt.compare(password, cadet.hashedPassword)
            if (!isValidUser) {
                return res.json({ success: false, message: "Username/Password combination incorrect" })
            }
            const accessToken = generateAccessToken(cadet)
            const refreshToken = generateRefreshToken(cadet)

            try {
                cadet.refreshToken = refreshToken;
                await cadet.save()
            } catch (err) {
                return res.json({ success: false, message: "Problem loggin In" })
            }

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: 60 * 60 * 1000
            })

            const additionalInfo = {
                name: cadet.name,
                mobileNumber: cadet.mobileNumber,
                email: cadet.email,
                nccWing: cadet.nccWing,
                enrollmentNumber: cadet.enrollmentNumber,
                permissions: cadet.permissions, accountApproved: cadet.accountApproved,
                role: 'CADET'
            }

            return res.json({ success: true, message: "Successfully logged In", accessToken, additionalInfo })
        } catch (err) {
            return res.json({ success: false, message: "Problem loggin In" })
        }

    } else if (role === 'PROBATION') {
        let probationer = undefined
        try {
            probationer = await Probationer.findOne({ email })
            if (!probationer) {
                return res.json({ success: false, message: "Username/Password combination incorrect" })
            }
        } catch (err) {
            return res.json({ success: false, message: "Username/Password combination incorrect" })
        }
        try {
            const isValidUser = await bcrypt.compare(password, probationer.hashedPassword)
            if (!isValidUser) {
                return res.json({ success: false, message: "Username/Password combination incorrect" })
            }
            const accessToken = generateAccessToken(probationer)
            const refreshToken = generateRefreshToken(probationer)

            try {
                probationer.refreshToken = refreshToken;
                await probationer.save()
            } catch (err) {
                return res.json({ success: false, message: "Problem loggin In" })
            }

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: 60 * 60 * 1000
            })

            const additionalInfo = {
                name: probationer.name,
                mobileNumber: probationer.mobileNumber,
                email: probationer.email, nccWing: probationer.nccWing,
                permissions: probationer.permissions, accountApproved: probationer.accountApproved,
                role: 'PROBATION'
            }

            res.json({ success: true, message: "Successfully logged In", accessToken, additionalInfo })
        } catch (err) {
            return res.json({ success: false, message: "Problem loggin In" })
        }
    }
    return res.json({ success: false, message: "Problem loggin In" })

})


router.get("/logout/:role", handleLogout)

export default router;