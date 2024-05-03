import express from 'express'

import permissionsMapping from '../config/permissionsMapping.js';
import verifyPermissions from '../middleware/verifyPermissions.js';

import Event from '../models/event.js';
import Poll from '../models/poll.js';
import Notification from '../models/notification.js';
import StudyMaterial from '../models/studyMaterial.js';
import Excuse from '../models/excuse.js';
import EventResponse from '../models/eventResponse.js'

import uploadImages from '../middleware/uploadImages.js';
import uploadFiles from '../middleware/uploadFiles.js';

const Router = express.Router();

Router.post("/event", verifyPermissions(permissionsMapping.canCreateEvent), uploadImages({ folder: 'event' }), async (req, res) => {
    const { Event_name, Event_date, start_time, Event_duration, Event_description, createdBy } = req.body;
    const newEvent = new Event({
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
    const { Poll_name, Poll_description, createdBy } = req.body;
    const newPoll = new Poll({
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
    const { Notification_name, Notification_description, createdBy } = req.body;
    const newNotification = new Notification({
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
    const { Study_Material_name, Study_Material_description, nccWing, createdBy } = req.body;
    const newStudyMaterial = new StudyMaterial({
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

export default Router