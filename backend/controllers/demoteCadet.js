import Cadet from "../models/cadetSchema.js";
import defaultNormalCadetPermissions from "../config/defaultNormalCadetPermissions.js";
import permissionsMapping from "../config/permissionsMapping.js";

export default async function demoteCadet(req, res) {
    const { cadetId } = req.body


    try {
        const foundCadet = await Cadet.findById(cadetId)
        if (req.permissions.includes(permissionsMapping.canDemoteWingSenior)) {
            foundCadet.hasSpecialPermissions = false
            foundCadet.permissions = defaultNormalCadetPermissions
            foundCadet.isWingSenior = false
        } else if (req.permissions.includes(permissionsMapping.canDemoteProbationSenior) && foundCadet.isWingSenior !== true) {
            foundCadet.hasSpecialPermissions = false
            foundCadet.permissions = defaultNormalCadetPermissions
            foundCadet.isProbationSenior = false
        } else {
            return res.json({ success: false, message: "Unauthorized actions" }).status(401)
        }
        await foundCadet.save()
        return res.json({ success: true, message: "Successfully demoted cadet" })
    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }



    return res.json({ success: false, message: "No cadet found" }).status(404)
}