import Cadet from "../models/cadetSchema.js";
import defaultProbationSeniorPermissions from "../config/defaultProbationSeniorPermissions.js";
import defaultWingSeniorPermissions from "../config/defaultWingSeniorPermissions.js";

export default async function promoteCadet(req, res) {
    const { cadetId, type } = req.body

    try {
        if (type === 'wing') {
            await Cadet.findByIdAndUpdate(cadetId, {
                hasSpecialPermissions: true,
                permissions: defaultWingSeniorPermissions,
                isWingSenior: true
            })
        } else if (type === 'probation') {
            await Cadet.findByIdAndUpdate(cadetId, {
                hasSpecialPermissions: true,
                permissions: defaultProbationSeniorPermissions,
                isProbationSenior: true
            })
        }
        return res.json({ success: true, message: "Successfully promoted cadet" })
    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }



    return res.json({ success: false, message: "No cadet found" }).status(404)
}