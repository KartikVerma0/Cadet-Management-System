import express from 'express'
import Event from '../models/event.js';
import Poll from '../models/poll.js';
import Notification from '../models/notification.js';

const Router = express.Router();

Router.get("/event", async (req, res) => {
    const events = await Event.find()
    return res.json({
        success: true,
        data: events
    })
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