import Camp from "../models/camp.js";
import Event from "../models/event.js";
import EventResponse from "../models/eventResponse.js";
import Excuse from "../models/excuse.js";
import Notification from "../models/notification.js";
import Poll from "../models/poll.js";
import StudyMaterial from "../models/studyMaterial.js";
import express from "express";
import permissionsMapping from "../config/permissionsMapping.js";
import uploadFiles from "../middleware/uploadFiles.js";
import uploadImages from "../middleware/uploadImages.js";
import verifyPermissions from "../middleware/verifyPermissions.js";

const Router = express.Router();

Router.post("/event", verifyPermissions(permissionsMapping.canCreateEvent), uploadImages({ folder: 'event' }), async (req, res) => {
    const { Event_name, Event_date, start_time, Event_duration, Event_description, createdBy, Event_group } = req.body;
    const newEvent = new Event({
        group: Event_group,
        name: Event_name,
        date: Event_date,
        startTime: start_time,
        duration: Event_duration,
        description: Event_description,
        images: req.files,
        createdBy
    })
    try {
        await newEvent.save()
        return res.json({ success: true, message: "Successfully got event data" })
    } catch (err) {
        return res.json({ success: false, message: "Problem saving event data" })
    }
})

Router.post("/poll", verifyPermissions(permissionsMapping.canCreatePoll), uploadImages({ folder: 'poll' }), async (req, res) => {
    const { Poll_name, Poll_description, createdBy, Poll_group } = req.body;
    const newPoll = new Poll({
        group: Poll_group,
        name: Poll_name,
        description: Poll_description,
        images: req.files,
        createdBy
    })
    try {
        await newPoll.save()
        return res.json({ success: true, message: "Successfully got poll data" })
    } catch (err) {
        return res.json({ success: false, message: "Problem saving poll data" })
    }
})

Router.post("/notification", verifyPermissions(permissionsMapping.canCreateNotification), uploadImages({ folder: 'notification' }), async (req, res) => {
    const { Notification_name, Notification_description, createdBy, Notification_group } = req.body;
    const newNotification = new Notification({
        group: Notification_group,
        name: Notification_name,
        description: Notification_description,
        images: req.files,
        createdBy
    })
    try {
        await newNotification.save()
        return res.json({ success: true, message: "Successfully got notification data" })
    } catch (err) {
        return res.json({ success: false, message: "Problem saving notification data" })
    }

})

Router.post("/study_material", verifyPermissions(permissionsMapping.canUploadStudyMaterial), uploadFiles(), async (req, res) => {
    const { Study_Material_name, Study_Material_description, nccWing, createdBy, Study_Material_group } = req.body;
    const newStudyMaterial = new StudyMaterial({
        group: Study_Material_group,
        name: Study_Material_name,
        description: Study_Material_description,
        nccWing,
        createdBy,
        files: req.files
    })
    try {
        await newStudyMaterial.save()
        return res.json({ success: true, message: "Successfully got Study Material data" })
    } catch (err) {
        return res.json({ success: false, message: "Problem saving Study Material data, Error:\n" + err.message })
    }
})

Router.post("/excuse", verifyPermissions(permissionsMapping.canRespondToEvent), uploadFiles(), async (req, res) => {
    const { Excuse_description, reasonCategory, createdBy, eventId, userEmail, role, nccWing, userData } = req.body;

    try {
        await Excuse.findOneAndDelete({ eventId, userEmail })
    } catch (err) {
        return res.json({ success: false, message: "Problem deleting old excuse data, Error:\n" + err.message }).status(500)
    }

    const newExcuse = new Excuse({
        description: Excuse_description,
        reasonCategory,
        createdBy,
        userEmail,
        nccWing,
        role,
        files: req.files,
        eventId,
        userData
    })
    try {
        await newExcuse.save()
        await EventResponse.findOneAndDelete({ eventId, email: userEmail })
        return res.json({ success: true, message: "Successfully saved excuse data" })
    } catch (err) {
        return res.json({ success: false, message: "Problem saving excuse data, Error:\n" + err.message }).status(500)
    }
})


Router.post("/new_camp", verifyPermissions(permissionsMapping.canRespondToEvent), uploadFiles(), async (req, res) => {
    const { New_Camp_name, New_Camp_startDate, New_Camp_endDate, New_Camp_location, New_Camp_description } = req.body;
    const { email } = req
    const newCamp = new Camp({
        title: New_Camp_name,
        startDate: New_Camp_startDate,
        endDate: New_Camp_endDate,
        location: New_Camp_location,
        description: New_Camp_description,
        email
    })
    try {
        await newCamp.save()
        return res.json({ success: true, message: "Successfully saved new camp data" })
    } catch (err) {
        return res.json({ success: false, message: "Problem saving new camp data, Error:\n" + err.message }).status(500)
    }
})
export default Router