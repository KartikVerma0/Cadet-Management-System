import express from 'express'
import Poll from '../models/poll.js'
import Event from '../models/event.js'
import PollResponse from '../models/pollResponse.js';
import EventResponse from '../models/eventResponse.js'
import permissionsMapping from '../config/permissionsMapping.js'
import verifyPermissions from '../middleware/verifyPermissions.js'

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

Router.post("/polls", verifyPermissions(permissionsMapping.canRespondToPoll), async (req, res) => {
    const { dataId, userName, userEmail, enrollmentNumber, nccWing, address, mobileNumber, gender, department, rollNumber, academicYear, response } = req.body;
    let selectedPoll = undefined;
    try {
        selectedPoll = await Poll.findById(dataId)
    } catch (err) {
        return res.json({ success: false, message: "Invalid Poll Selected" })
    }
    // console.log(selectedPoll)
    try {

        const selectedPollResponse = await PollResponse.findOne({ pollId: dataId, email: userEmail })

        if (selectedPollResponse) {
            selectedPollResponse.response = response
            await selectedPollResponse.save()
        } else {
            const newResponse = new PollResponse({
                pollId: dataId,
                name: userName,
                email: userEmail,
                enrollmentNumber,
                nccWing,
                address, mobileNumber,
                gender, department,
                rollNumber, academicYear,
                response
            })
            await newResponse.save()
        }
    } catch (err) {
        console.log(err)
        return res.json({ success: false, message: "Problem recording your response, Error: \n" + err })
    }

    return res.json({ success: true, message: "Successfully recorded your response" })
})


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

Router.post("/events", verifyPermissions(permissionsMapping.canRespondToEvent), async (req, res) => {
    const { dataId, userName, userEmail, enrollmentNumber, nccWing, address, mobileNumber, gender, department, rollNumber, academicYear, response } = req.body;
    let selectedEvent = undefined;
    try {
        selectedEvent = await Event.findById(dataId)
    } catch (err) {
        return res.json({ success: false, message: "Invalid Event Selected" })
    }
    try {

        const selectedEventResponse = await EventResponse.findOne({ eventId: dataId, email: userEmail })

        if (selectedEventResponse) {
            selectedEventResponse.response = response
            await selectedEventResponse.save()
        } else {
            const newResponse = new EventResponse({
                eventId: dataId,
                name: userName,
                email: userEmail,
                enrollmentNumber,
                nccWing,
                address, mobileNumber,
                gender, department,
                rollNumber, academicYear,
                response
            })
            await newResponse.save()
        }
    } catch (err) {
        console.log(err)
        return res.json({ success: false, message: "Problem recording your response, Error: \n" + err })
    }

    return res.json({ success: true, message: "Successfully recorded your response" })
})
export default Router