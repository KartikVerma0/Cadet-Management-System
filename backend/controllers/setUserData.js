import ANO_CTO from '../models/ano_ctoSchema.js'
import Cadet from '../models/cadetSchema.js'
import Probationer from '../models/probationUser.js'

export default async function setUserData(req, res) {
    const { email } = req;
    const { role, address, mobileNumber, enrollmentNumber, academicYear, nearestRailwayStation, nearestPoliceStation } = req.body
    if (role === 'ANO_CTO') {
        try {
            const user = await ANO_CTO.findOneAndUpdate({ email }, { mobileNumber });
            if (!user) {
                return res.json({ success: false, message: "User not available" }).status(404)
            }

            return res.json({ success: true, message: "Successfully found user data", userData: user })
        } catch (err) {
            return res.json({ success: false, message: "Server Error " + err.message }).status(500)
        }
    }
    else if (role === 'CADET') {
        try {
            const user = await Cadet.findOneAndUpdate({ email }, {
                address,
                enrollmentNumber,
                academicYear,
                nearestPoliceStation,
                nearestRailwayStation,
                mobileNumber
            }, { runValidators: true });
            if (!user) {
                return res.json({ success: false, message: "User not available" }).status(404)
            }

            return res.json({ success: true, message: "Successfully found user data", userData: user })
        } catch (err) {
            return res.json({ success: false, message: "Server Error " + err.message }).status(500)
        }
    }
    else if (role === 'PROBATION') {
        try {
            const user = await Probationer.findOneAndUpdate({ email }, {
                address,
                nearestPoliceStation,
                nearestRailwayStation,
                mobileNumber
            },
                { runValidators: true });
            if (!user) {
                return res.json({ success: false, message: "User not available" }).status(404)
            }

            return res.json({ success: true, message: "Successfully found user data", userData: user })
        } catch (err) {
            return res.json({ success: false, message: "Server Error " + err.message }).status(500)
        }
    }

    return res.json({ success: false, message: "Invalid role selected" }).status(404)
}