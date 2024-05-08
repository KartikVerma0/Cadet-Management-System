import Cadet from "../models/cadetSchema.js";

export default async function getCadetsListUsingFilter(req, res) {
    const { filter } = req.query
    const filterRegEx = new RegExp(filter, 'i')
    let cadets = undefined;
    try {
        cadets = await Cadet.find({ name: { $regex: filterRegEx } })
    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }

    if (cadets) {
        return res.json({ success: true, cadets })
    }

    return res.json({ success: false, message: "No cadet found" }).status(404)
}