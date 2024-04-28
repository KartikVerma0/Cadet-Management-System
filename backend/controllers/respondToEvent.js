import Event from '../models/event.js'
import EventResponse from '../models/eventResponse.js'

export default async function respondToEvent(req, res) {
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
}