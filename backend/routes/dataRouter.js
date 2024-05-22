import Event from "../models/event.js";
import Notification from "../models/notification.js";
import Poll from "../models/poll.js";
import express from "express";
import getAllCadets from "../controllers/getAllCadets.js";
import getAttendanceRecord from "../controllers/getAttendanceRecord.js";
import getCadetAttendance from "../controllers/getCadetAttendance.js";
import getCadetsListUsingNameFilter from "../controllers/getCadetsListUsingNameFilter.js";
import getCampData from "../controllers/getCampData.js";
import getEventData from "../controllers/getEventData.js";
import getPollData from "../controllers/getPollData.js";
import getStudyMaterial from "../controllers/getStudyMaterial.js";
import markAttendanceRecord from "../controllers/markAttendanceRecord.js";

const Router = express.Router();

Router.get("/eventdata", getEventData)

Router.get("/event", async (req, res) => {
    const todayDate = new Date()
    const group = req.role === "CADET" ? "cadet" : req.role === "PROBATION" ? "probation" : ""
    let events = null;
    if (group) {
        events = await Event.find({
            date: { $gte: todayDate },
            group
        })
    } else {
        events = await Event.find({
            date: { $gte: todayDate }
        })
    }
    return res.json({
        success: true,
        data: events
    })
})

Router.get("/pastevents", async (req, res) => {
    const todayDate = new Date()
    const group = req.role === "CADET" ? "cadet" : req.role === "PROBATION" ? "probation" : ""
    let events = null;
    if (group) {
        events = await Event.find({
            date: { $lt: todayDate },
            group
        })
    } else {
        events = await Event.find({
            date: { $lt: todayDate }
        })
    }
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
    const group = req.role === "CADET" ? "cadet" : req.role === "PROBATION" ? "probation" : ""
    let polls = null;
    if (group) {
        polls = await Poll.find({
            postedDate: { $gte: lastWeekDate },
            group
        })
    } else {
        polls = await Poll.find({
            postedDate: { $gte: lastWeekDate }
        })
    }

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

    const group = req.role === "CADET" ? "cadet" : req.role === "PROBATION" ? "probation" : ""
    let notifications = null;
    if (group) {
        notifications = await Notification.find({
            postedDate: { $gte: lastWeekDate },
            group
        })
    } else {
        notifications = await Notification.find({
            postedDate: { $gte: lastWeekDate }
        })
    }
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

Router.get("/cadets", getCadetsListUsingNameFilter)

Router.get("/allCadets", getAllCadets)

Router.get("/cadet/attendance", getCadetAttendance)

Router.get("/attendance", getAttendanceRecord)

Router.post("/attendance", markAttendanceRecord)


export default Router