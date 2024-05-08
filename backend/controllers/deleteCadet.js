import Cadet from "../models/cadetSchema.js";

export default async function deleteCadet(req, res) {
    const { dataId } = req.query
    try {
        await Cadet.findByIdAndDelete(dataId)
        return res.json({ success: true, message: `Deleted account with ID: ${dataId}` })
    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }
}