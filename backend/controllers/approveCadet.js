import Cadet from "../models/cadetSchema.js";

export default async function approveCadet(req, res) {
    const { dataId } = req.body
    try {
        await Cadet.findByIdAndUpdate(dataId, { accountApproved: true })
        return res.json({ success: true, message: `Approved account with ID: ${dataId}` })
    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }
}