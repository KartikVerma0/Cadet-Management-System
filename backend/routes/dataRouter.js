import express from 'express'
import Event from '../models/event.js';
import Poll from '../models/poll.js';
import Notification from '../models/notification.js';

const Router = express.Router();

Router.get("/eventdata", async (req, res) => {
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
})

Router.get("/event", async (req, res) => {
    const events = await Event.find()
    return res.json({
        success: true,
        data: events
    })
})

Router.get("/polldata", async (req, res) => {
    const { pollId } = req.query;
    let pollInfo = undefined;
    try {
        pollInfo = await Poll.findById(pollId)
    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }

    if (pollInfo) {
        return res.json({ success: true, pollInfo })
    }

    return res.json({ success: false, message: "Invalid poll selected" }).status(404)
})

Router.get("/poll", async (req, res) => {
    const polls = await Poll.find()
    return res.json({
        success: true,
        data: polls
    })
})

Router.get("/notification", async (req, res) => {
    const notifications = await Notification.find()
    return res.json({
        success: true,
        data: notifications
    })
})


export default Router