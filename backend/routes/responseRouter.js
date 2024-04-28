import express from 'express'
import Poll from '../models/poll.js'
import Event from '../models/event.js'
import PollResponse from '../models/pollResponse.js';
import EventResponse from '../models/eventResponse.js'
import permissionsMapping from '../config/permissionsMapping.js'
import verifyPermissions from '../middleware/verifyPermissions.js'

import respondToEvent from '../controllers/respondToEvent.js';
import respondToPoll from '../controllers/respondToPoll.js';

const Router = express.Router()

Router.get("/allpollresponses", verifyPermissions(permissionsMapping.canSeePollResponses), async (req, res) => {
    const { pollId } = req.query;
    let pollResponses = undefined;
    try {
        pollResponses = await PollResponse.find({ pollId })
    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }

    if (pollResponses.length) {
        return res.json({ success: true, pollResponses })
    }
    return res.json({ success: false, message: "No responses found" })

})
Router.get("/polls", async (req, res) => {
    const { dataId: pollId, email } = req.query;
    let response = undefined;
    try {
        response = await PollResponse.findOne({ pollId, email })
    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }

    if (response) {
        return res.json({ success: true, response: response.response })
    }

    return res.json({ success: false, message: "No previous response found" })

})

Router.post("/polls", verifyPermissions(permissionsMapping.canRespondToPoll), respondToPoll)


Router.get("/alleventresponses", async (req, res) => {
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
})

Router.get("/events", async (req, res) => {
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

})

Router.post("/events", verifyPermissions(permissionsMapping.canRespondToEvent), respondToEvent)
export default Router