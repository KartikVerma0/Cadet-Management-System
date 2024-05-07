import Event from "../models/event.js";
import Notification from "../models/notification.js";
import Poll from "../models/poll.js";
import express from "express";
import getCampData from "../controllers/getCampData.js";
import getEventData from "../controllers/getEventData.js";
import getPollData from "../controllers/getPollData.js";
import getStudyMaterial from "../controllers/getStudyMaterial.js";

const Router = express.Router();

Router.get("/eventdata", getEventData)

Router.get("/event", async (req, res) => {
    const todayDate = new Date()
    const events = await Event.find({
        date: { $gte: todayDate }
    })
    return res.json({
        success: true,
        data: events
    })
})

Router.get("/pastevents", async (req, res) => {
    const todayDate = new Date()
    const events = await Event.find({
        date: { $lt: todayDate }
    })

    if (!events || events.length === 0) {
        return res.json({
            success: false,
            message: "No previous events found"
        })
    }
    return res.json({
        success: true,
        data: events
    })
})

Router.get("/polldata", getPollData)

Router.get("/poll", async (req, res) => {
    const lastWeekDate = new Date()
    lastWeekDate.setDate(lastWeekDate.getDate() - 7)
    const polls = await Poll.find({
        postedDate: { $gte: lastWeekDate }
    })
    return res.json({
        success: true,
        data: polls
    })
})

Router.get("/pastpolls", async (req, res) => {
    const lastWeekDate = new Date()
    lastWeekDate.setDate(lastWeekDate.getDate() - 7)
    const polls = await Poll.find({
        postedDate: { $lt: lastWeekDate }
    })

    if (!polls || polls.length === 0) {
        return res.json({
            success: false,
            message: "No previous polls found"
        })
    }

    return res.json({
        success: true,
        data: polls
    })
})

Router.get("/notification", async (req, res) => {
    const lastWeekDate = new Date()
    lastWeekDate.setDate(lastWeekDate.getDate() - 7)
    const notifications = await Notification.find({
        postedDate: { $gte: lastWeekDate }
    })
    return res.json({
        success: true,
        data: notifications
    })
})

Router.get("/pastnotifications", async (req, res) => {
    const lastWeekDate = new Date()
    lastWeekDate.setDate(lastWeekDate.getDate() - 7)
    const notifications = await Notification.find({
        postedDate: { $lt: lastWeekDate }
    })

    if (!notifications || notifications.length === 0) {
        return res.json({
            success: false,
            message: "No previous notifications found"
        })
    }

    return res.json({
        success: true,
        data: notifications
    })
})

Router.get("/studymaterial", getStudyMaterial)

Router.get("/camp", getCampData)


export default Router