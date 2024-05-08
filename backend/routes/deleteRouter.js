import Event from "../models/event.js";
import EventResponse from "../models/eventResponse.js";
import Notification from "../models/notification.js";
import Poll from "../models/poll.js";
import PollResponse from "../models/pollResponse.js";
import express from "express";

const Router = express.Router();

Router.delete('/events', async (req, res) => {
    const { eventsId } = req.query

    try {
        await Event.deleteOne({ _id: eventsId })
    } catch (err) {
        return res.json({ success: false, message: `Problem deleting Event, Error:\n ${err.message}` }).status(500)
    }

    return res.json({ success: true, message: "Successfully deleted Event" })
})

Router.delete('/polls', async (req, res) => {
    const { pollsId } = req.query

    try {
        await Poll.deleteOne({ _id: pollsId })
    } catch (err) {
        return res.json({ success: false, message: `Problem deleting Poll, Error:\n ${err.message}` }).status(500)
    }

    return res.json({ success: true, message: "Successfully deleted Poll" })
})

Router.delete('/notifications', async (req, res) => {
    const { notificationsId } = req.query

    try {
        await Notification.deleteOne({ _id: notificationsId })
        return res.json({ success: true, message: "Successfully deleted Notification" })
    } catch (err) {
        return res.json({ success: false, message: "Problem deleting Notification" }).status(500)
    }
})

export default Router