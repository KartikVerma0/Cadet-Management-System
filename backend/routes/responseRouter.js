import express from 'express'
import Poll from '../models/poll.js'
import PollResponse from '../models/pollResponse.js';
import permissionsMapping from '../config/permissionsMapping.js'
import verifyPermissions from '../middleware/verifyPermissions.js'

const Router = express.Router()

Router.get("/polls", async (req, res) => {
    const { dataId: pollId, email } = req.query;
    let response = undefined;
    try {
        response = await PollResponse.findOne({ pollId, 'userDetails.email': email })
    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }

    if (response) {
        return res.json({ success: true, response: response.response })
    }

    return res.json({ success: false, message: "No previous response found" })

})

Router.post("/polls", verifyPermissions(permissionsMapping.canRespondToPoll), async (req, res) => {
    const { dataId, userEmail, enrollmentNumber, nccWing, response } = req.body;
    let selectedPoll = undefined;
    try {
        selectedPoll = await Poll.findById(dataId)
    } catch (err) {
        return res.json({ success: false, message: "Invalid Poll Selected" })
    }
    // console.log(selectedPoll)
    try {

        const selectedPollResponse = await PollResponse.findOne({ pollId: dataId, 'userDetails.email': userEmail })

        if (selectedPollResponse) {
            selectedPollResponse.response = response
            await selectedPollResponse.save()
        } else {
            const newResponse = new PollResponse({
                pollId: dataId,
                userDetails: {
                    email: userEmail,
                    enrollmentNumber: enrollmentNumber,
                    nccWing: nccWing,
                },
                response: response
            })
            await newResponse.save()
        }
    } catch (err) {
        console.log(err)
        return res.json({ success: false, message: "Problem recording your response, Error: \n" + err })
    }

    return res.json({ success: true, message: "Successfully recorded your response" })
})

Router.get("/events", async (req, res) => {
    const { dataId: eventId, email } = req.query;

    return res.json({ success: false, message: "No previous response found" })

})

Router.post("/events", verifyPermissions(permissionsMapping.canRespondToEvent), async (req, res) => {
    res.json({ success: true, message: "Successfully recorded your response" })
})
export default Router