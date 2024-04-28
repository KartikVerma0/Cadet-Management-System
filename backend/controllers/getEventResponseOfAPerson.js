import EventResponse from '../models/eventResponse.js'

export default async function getEventResponseOfAPerson(req, res) {
    const { dataId: eventId, email } = req.query;
    let response = undefined;
    try {
        response = await EventResponse.findOne({ eventId, email })
    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }

    if (response) {
        return res.json({ success: true, response: response.response })
    }

    return res.json({ success: false, message: "No previous response found" })
}