import ANO_CTO from "../models/ano_ctoSchema.js";
import Cadet from "../models/cadetSchema.js";
import Probationer from "../models/probationUser.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/authToken.js";

export default async function loginController(req, res) {
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
            const accessToken = generateAccessToken(ano_cto, role)
            const refreshToken = generateRefreshToken(ano_cto, role)
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
                id: ano_cto._id,
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
            const accessToken = generateAccessToken(cadet, role)
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
                id: cadet._id,
                name: cadet.name,
                mobileNumber: cadet.mobileNumber,
                email: cadet.email,
                nccWing: cadet.nccWing,
                enrollmentNumber: cadet.enrollmentNumber,
                permissions: cadet.permissions, accountApproved: cadet.accountApproved,
                address: cadet.address,
                gender: cadet.gender, department: cadet.department,
                rollNumber: cadet.rollNumber, academicYear: cadet.academicYear,
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
            const accessToken = generateAccessToken(probationer, role)
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
                id: probationer._id,
                name: probationer.name,
                mobileNumber: probationer.mobileNumber,
                email: probationer.email, nccWing: probationer.nccWing,
                permissions: probationer.permissions, accountApproved: probationer.accountApproved,
                address: probationer.address,
                gender: probationer.gender, department: probationer.department,
                rollNumber: probationer.rollNumber, academicYear: probationer.academicYear,
                role: 'PROBATION'
            }

            return res.json({ success: true, message: "Successfully logged In", accessToken, additionalInfo })
        } catch (err) {
            return res.json({ success: false, message: "Problem loggin In" })
        }
    }
    return res.json({ success: false, message: "Problem loggin In" })
}