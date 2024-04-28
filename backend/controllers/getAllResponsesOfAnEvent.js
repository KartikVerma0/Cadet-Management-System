import EventResponse from '../models/eventResponse.js'

export default async function getAllResponsesOfAnEvent(req, res) {
    const { eventId } = req.query;
    let eventResponses = undefined;
    try {
        eventResponses = await EventResponse.find({ eventId })
    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }

    if (eventResponses.length) {
        return res.json({ success: true, eventResponses })
    }
    return res.json({ success: false, message: "No responses found" })
}