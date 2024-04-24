import express from 'express'

import permissionsMapping from '../config/permissionsMapping.js';
import verifyPermissions from '../middleware/verifyPermissions.js';

import Event from '../models/event.js';
import Poll from '../models/poll.js';
import Notification from '../models/notification.js';

const Router = express.Router();

Router.post("/event", verifyPermissions(permissionsMapping.canCreateEvent), async (req, res) => {
    const { Event_name, Event_date, start_time, Event_duration, Event_description } = req.body;
    const newEvent = new Event({
        name: Event_name,
        date: Event_date,
        startTime: start_time,
        duration: Event_duration,
        description: Event_description
    })
    await newEvent.save();
    return res.json({ success: true, message: "Successfully got event data" })
})

Router.post("/poll", verifyPermissions(permissionsMapping.canCreatePoll), async (req, res) => {
    const { Poll_name, Poll_description } = req.body;
    const newPoll = new Poll({
        name: Poll_name,
        description: Poll_description
    })
    await newPoll.save();
    return res.json({ success: true, message: "Successfully got event data" })
})

Router.post("/notification", verifyPermissions(permissionsMapping.canCreateNotification), async (req, res) => {
    const { Notification_name, Notification_description } = req.body;
    const newNotification = new Notification({
        name: Notification_name,
        description: Notification_description
    })
    await newNotification.save();
    return res.json({ success: true, message: "Successfully got event data" })
})

export default Router