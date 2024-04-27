import express from 'express'

import cloudinary from '../config/cloudinary.js';

import permissionsMapping from '../config/permissionsMapping.js';
import verifyPermissions from '../middleware/verifyPermissions.js';

import Event from '../models/event.js';
import Poll from '../models/poll.js';
import Notification from '../models/notification.js';

const Router = express.Router();

Router.post("/event", verifyPermissions(permissionsMapping.canCreateEvent), async (req, res) => {
    const { Event_name, Event_date, start_time, Event_duration, Event_description, previewSource } = req.body;
    const newEvent = new Event({
        name: Event_name,
        date: Event_date,
        startTime: start_time,
        duration: Event_duration,
        description: Event_description
    })
    let hasFirstRun = false;
    if (previewSource.length !== 0) {
        try {
            previewSource.forEach(async (fileStr) => {
                try {
                    await cloudinary.uploader.upload(fileStr, {
                        upload_preset: 'CMS',
                        folder: 'CMS/event'
                    }, (err, callResult) => {
                        if (err) {
                            return res.json({ success: false, message: "Error uploading images, Error details:\n", err }).status(500)
                        }
                        newEvent.images.push({ url: callResult.secure_url, publicId: callResult.public_id })
                    })

                } catch (err) {
                    console.log(err)
                    return res.json({ success: false, message: "Error uploading images, Error details:\n", err }).status(500)
                }
            })

            setTimeout(async () => {
                if (newEvent.images.length !== previewSource.length) {
                    hasFirstRun = true;
                    newEvent.images.forEach(async (image) => {
                        await cloudinary.uploader.destroy(image.publicId)
                    })
                    return res.json({ success: false, message: "Error uploading images" }).status(500)
                }
                await newEvent.save()
            }, previewSource.length * 3000)

        } catch (err) {
            return res.json({ success: false, message: "Error uploading images, Error details:\n", err }).status(500)
        }
        setTimeout(() => {
            if (!hasFirstRun) {
                return res.json({ success: true, message: "Successfully got event data" })
            }
        }, previewSource.length * 3000)
    } else {
        await newEvent.save()
        return res.json({ success: true, message: "Successfully got event data" })
    }
})

Router.post("/poll", verifyPermissions(permissionsMapping.canCreatePoll), async (req, res) => {
    const { Poll_name, Poll_description, previewSource } = req.body;

    const newPoll = new Poll({
        name: Poll_name,
        description: Poll_description,
    })

    let hasFirstRun = false;
    if (previewSource.length !== 0) {
        try {
            previewSource.forEach(async (fileStr) => {
                try {
                    await cloudinary.uploader.upload(fileStr, {
                        upload_preset: 'CMS',
                        folder: 'CMS/poll'
                    }, (err, callResult) => {
                        if (err) {
                            return res.json({ success: false, message: "Error uploading images, Error details:\n", err }).status(500)
                        }
                        newPoll.images.push({ url: callResult.secure_url, publicId: callResult.public_id })
                    })

                } catch (err) {
                    console.log(err)
                    return res.json({ success: false, message: "Error uploading images, Error details:\n", err }).status(500)
                }
            })

            setTimeout(async () => {
                if (newPoll.images.length !== previewSource.length) {
                    hasFirstRun = true;
                    newPoll.images.forEach(async (image) => {
                        await cloudinary.uploader.destroy(image.publicId)
                    })
                    return res.json({ success: false, message: "Error uploading images" }).status(500)
                }
                await newPoll.save()
            }, previewSource.length * 3000)

        } catch (err) {
            return res.json({ success: false, message: "Error uploading images, Error details:\n", err }).status(500)
        }
        setTimeout(() => {
            if (!hasFirstRun) {
                return res.json({ success: true, message: "Successfully got poll data" })
            }
        }, previewSource.length * 3000)
    } else {
        await newPoll.save()
        return res.json({ success: true, message: "Successfully got poll data" })
    }
})

Router.post("/notification", verifyPermissions(permissionsMapping.canCreateNotification), async (req, res) => {
    const { Notification_name, Notification_description, previewSource } = req.body;
    const newNotification = new Notification({
        name: Notification_name,
        description: Notification_description
    })
    let hasFirstRun = false;
    if (previewSource.length !== 0) {
        try {
            previewSource.forEach(async (fileStr) => {
                try {
                    await cloudinary.uploader.upload(fileStr, {
                        upload_preset: 'CMS',
                        folder: 'CMS/notification'
                    }, (err, callResult) => {
                        if (err) {
                            return res.json({ success: false, message: "Error uploading images, Error details:\n", err }).status(500)
                        }
                        newNotification.images.push({ url: callResult.secure_url, publicId: callResult.public_id })
                    })

                } catch (err) {
                    console.log(err)
                    return res.json({ success: false, message: "Error uploading images, Error details:\n", err }).status(500)
                }
            })

            setTimeout(async () => {
                if (newNotification.images.length !== previewSource.length) {
                    hasFirstRun = true;
                    newNotification.images.forEach(async (image) => {
                        await cloudinary.uploader.destroy(image.publicId)
                    })
                    return res.json({ success: false, message: "Error uploading images" }).status(500)
                }
                await newNotification.save()
            }, previewSource.length * 3000)

        } catch (err) {
            return res.json({ success: false, message: "Error uploading images, Error details:\n", err }).status(500)
        }
        setTimeout(() => {
            if (!hasFirstRun) {
                return res.json({ success: true, message: "Successfully got notification data" })
            }
        }, previewSource.length * 3000)
    } else {
        await newNotification.save()
        return res.json({ success: true, message: "Successfully got notification data" })
    }
})

export default Router