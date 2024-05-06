import Camp from "../models/camp.js";

export default async function getCampData(req, res) {
    const { email } = req
    let camps = undefined;
    try {
        camps = await Camp.find({ email })
    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }

    if (camps) {
        return res.json({ success: true, camps })
    }

    return res.json({ success: false, message: "No camps found" }).status(404)
}