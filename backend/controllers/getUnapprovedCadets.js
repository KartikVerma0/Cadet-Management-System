import Cadet from "../models/cadetSchema.js";

export default async function getUnapprovedCadet(req, res) {
    const { nccWing } = req.query

    let unapprovedCadets = undefined;
    try {
        if (nccWing !== 'All') {
            unapprovedCadets = await Cadet.find({ accountApproved: false, nccWing })
        } else {
            unapprovedCadets = await Cadet.find({ accountApproved: false })
        }

    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }
    if (unapprovedCadets) {
        return res.json({ success: true, unapprovedCadets })
    }
    return res.json({ success: false, message: "No unapproved cadet found" }).status(404)
}