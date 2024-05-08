import EventResponse from "./eventResponse.js";
import mongoose from "mongoose";

const { Schema } = mongoose;

const eventSchema = new Schema({
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