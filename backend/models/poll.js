import PollResponse from "./pollResponse.js";
import mongoose from "mongoose";

const { Schema } = mongoose;

const pollSchema = new Schema({
    group: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
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
    },
})

pollSchema.pre('deleteOne', async function (next) {
    try {

        const responses = await PollResponse.find({ pollId: this._conditions._id });

        if (responses && responses.length > 0) {
            await PollResponse.deleteMany({ pollId: this._conditions._id });
        }
        next()
    } catch (err) {
        throw new Error("Problem deleting Poll Responses before deleting Poll")
    }
})

const Poll = mongoose.model("Poll", pollSchema);

export default Poll