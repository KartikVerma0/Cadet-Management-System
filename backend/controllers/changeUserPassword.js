import ANO_CTO from "../models/ano_ctoSchema.js";
import Cadet from "../models/cadetSchema.js";
import Probationer from "../models/probationUser.js";
import bcrypt from "bcrypt";

export default async function changeUserPassword(req, res) {
    const { email } = req;
    const { role, oldPassword, newPassword } = req.body
    if (role === 'ANO_CTO') {
        try {
            const user = await ANO_CTO.findOne({ email });
            if (!user) {
                return res.json({ success: false, message: "User not available" }).status(404)
            }
            const isPasswordMatching = await bcrypt.compare(oldPassword, user.hashedPassword)
            if (isPasswordMatching) {
                const newHashedPassword = await bcrypt.hash(newPassword, 12)
                user.hashedPassword = newHashedPassword;
                await user.save()
            } else {
                return res.json({ success: false, message: "Please enter valid password" }).status(401)
            }


            return res.json({ success: true, message: "Successfully updated user password", userData: user })
        } catch (err) {
            return res.json({ success: false, message: "Server Error " + err.message }).status(500)
        }
    }
    else if (role === 'CADET') {
        try {
            const user = await Cadet.findOne({ email });
            if (!user) {
                return res.json({ success: false, message: "User not available" }).status(404)
            }
            const isPasswordMatching = await bcrypt.compare(oldPassword, user.hashedPassword)
            if (isPasswordMatching) {
                const newHashedPassword = await bcrypt.hash(newPassword, 12)
                user.hashedPassword = newHashedPassword;
                await user.save()
            } else {
                return res.json({ success: false, message: "Please enter valid password" }).status(401)
            }


            return res.json({ success: true, message: "Successfully updated user password", userData: user })
        } catch (err) {
            return res.json({ success: false, message: "Server Error " + err.message }).status(500)
        }
    }
    else if (role === 'PROBATION') {
        try {
            const user = await Probationer.findOne({ email });
            if (!user) {
                return res.json({ success: false, message: "User not available" }).status(404)
            }
            const isPasswordMatching = await bcrypt.compare(oldPassword, user.hashedPassword)
            if (isPasswordMatching) {
                const newHashedPassword = await bcrypt.hash(newPassword, 12)
                user.hashedPassword = newHashedPassword;
                await user.save()
            } else {
                return res.json({ success: false, message: "Please enter valid password" }).status(401)
            }


            return res.json({ success: true, message: "Successfully updated user password", userData: user })
        } catch (err) {
            return res.json({ success: false, message: "Server Error " + err.message }).status(500)
        }
    }

    return res.json({ success: false, message: "Invalid role selected" }).status(404)
}