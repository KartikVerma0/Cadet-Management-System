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
    const events = await Event.find()
    return res.json({
        success: true,
        data: events
    })
})

Router.get("/polldata", getPollData)

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

Router.get("/studymaterial", getStudyMaterial)

Router.get("/camp", getCampData)


export default Router