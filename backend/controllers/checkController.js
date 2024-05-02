import ANO_CTO from "../models/ano_ctoSchema.js"
import Cadet from "../models/cadetSchema.js"
import Probationer from "../models/probationUser.js"

export default async function (req, res) {
    const { email } = req.query
    if (email) {
        try {
            const foundUser1 = await ANO_CTO.findOne({ email })
            if (foundUser1) return res.json({ success: false, message: "Please select a unique email ID" })
            const foundUser2 = await Cadet.findOne({ email })
            if (foundUser2) return res.json({ success: false, message: "Please select a unique email ID" })
            const foundUser3 = await Probationer.findOne({ email })
            if (foundUser3) return res.json({ success: false, message: "Please select a unique email ID" })

            return res.json({ success: true, message: "Unique email" })

        } catch (err) {
            return res.json({ success: false, message: "Server Error (checking function" }).status(500)
        }
    }

    return res.json({ success: false, message: "Please select a unique parameter" }).status(400)
}