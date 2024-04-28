import Poll from '../models/poll.js'
import PollResponse from '../models/pollResponse.js';


export default async function respondToPoll(req, res) {
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
}