import AttendanceRecordCadet from "./attendanceRecordCadet.js";
import AttendanceRecordProbation from "./attendanceRecordProbation.js";
import EventResponse from "./eventResponse.js";
import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema({
    group: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
    },
    description: {
        type: String,
    },
    images: [{
        url: {
            type: String,
            required: true
        },
        publicId: {
            type: String,
            required: true
        }
    }],
    createdBy: {
        type: String,
        required: true
    },
    postedDate: {
        type: Date,
        default: new Date().toLocaleString({ timeZone: 'Asia/Kolkata' })
    }
})


eventSchema.post('save', async function (next) {
    const group = this.group;
    let attendanceRecord = undefined;
    try {
        if (group === "cadet") {
            attendanceRecord = await AttendanceRecordCadet.findOne({ eventID: this._id })
            if (!attendanceRecord) {
                const newRecord = new AttendanceRecordCadet({
                    eventID: this._id
                })

                await newRecord.save()
            } else {
                next()
            }
        } else if (group === "probation") {
            attendanceRecord = await AttendanceRecordProbation.findOne({ eventID: this._id })
            if (!attendanceRecord) {
                const newRecord = new AttendanceRecordProbation({
                    eventID: this._id
                })

                await newRecord.save()
            } else {
                next()
            }
        }
    } catch (error) {
        console.log(error.message)
    }
})

eventSchema.pre('deleteOne', async function (next) {
    try {

        const responses = await EventResponse.find({ eventId: this._conditions._id });

        if (responses && responses.length > 0) {
            await EventResponse.deleteMany({ eventId: this._conditions._id });
        }
        next()
    } catch (err) {
        throw new Error("Problem deleting Event Responses before deleting Event")
    }
})

const Event = mongoose.model("Event", eventSchema);

export default Event