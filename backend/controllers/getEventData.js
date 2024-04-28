import Event from '../models/event.js';

export default async function getEventData(req, res) {
    const { eventId } = req.query;
    let eventInfo = undefined;
    try {
        eventInfo = await Event.findById(eventId)
    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }

    if (eventInfo) {
        return res.json({ success: true, eventInfo })
    }

    return res.json({ success: false, message: "Invalid event selected" }).status(404)
}