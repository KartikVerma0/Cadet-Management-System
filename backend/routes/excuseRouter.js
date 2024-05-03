import express from 'express'
import permissionsMapping from '../config/permissionsMapping.js'
import verifyPermissions from '../middleware/verifyPermissions.js'
import Excuse from '../models/excuse.js'
import EventResponse from '../models/eventResponse.js'

const Router = express.Router()

Router.get("/pending", async (req, res) => {
    const { nccWing } = req.query

    let pendingExcuses = undefined;
    try {
        if (nccWing !== 'All') {
            pendingExcuses = await Excuse.find({ nccWing, isPending: true }).populate({
                path: 'eventId',
                select: 'name date'
            })
        } else {
            pendingExcuses = await Excuse.find({ isPending: true }).populate({
                path: 'eventId',
                select: 'name date'
            })
        }

    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }
    if (pendingExcuses) {
        return res.json({ success: true, pendingExcuses })
    }
    return res.json({ success: false, message: "No pending excuses found" }).status(404)
})


Router.post("/approve", async (req, res) => {
    const { excuseId } = req.body

    let approvedExcuses = undefined;
    try {
        approvedExcuses = await Excuse.findById(excuseId)
        approvedExcuses.isPending = false;
        approvedExcuses.isRejected = false;
        await approvedExcuses.save()
    } catch (err) {
        return res.json({ success: false, message: "Server Error, Error: " + err.message }).status(500)
    }
    if (approvedExcuses) {
        const newResponse = new EventResponse({
            eventId: approvedExcuses.eventId,
            name: approvedExcuses.userData.userName,
            email: approvedExcuses.userData.userEmail,
            enrollmentNumber: approvedExcuses.userData.enrollmentNumber,
            nccWing: approvedExcuses.userData.nccWing,
            address: approvedExcuses.userData.address,
            mobileNumber: approvedExcuses.userData.mobileNumber,
            gender: approvedExcuses.userData.gender,
            department: approvedExcuses.userData.department,
            rollNumber: approvedExcuses.userData.rollNumber,
            academicYear: approvedExcuses.userData.academicYear,
            response: false
        })

        await newResponse.save()

        return res.json({ success: true, message: "Successfully approved excuse." })
    }
    return res.json({ success: false, message: "No excuse found" }).status(404)
})

Router.post("/reject", async (req, res) => {
    const { excuseId } = req.body

    let rejectedExcuses = undefined;
    try {
        rejectedExcuses = await Excuse.findById(excuseId)
        rejectedExcuses.isRejected = true;
        rejectedExcuses.isPending = false;
        await rejectedExcuses.save()
    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }
    if (rejectedExcuses) {
        await EventResponse.findOneAndDelete({ eventId: rejectedExcuses.eventId, email: rejectedExcuses.userData.userEmail })
        return res.json({ success: true, message: "Excuse rejected!" })
    }
    return res.json({ success: false, message: "No excuse found" }).status(404)
})

export default Router