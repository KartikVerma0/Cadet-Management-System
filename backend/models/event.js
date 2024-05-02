import mongoose from 'mongoose'
const { Schema } = mongoose;

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
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
        type: String,
        default: new Date().toLocaleString({ timeZone: 'Asia/Kolkata' })
    }
})

const Event = mongoose.model("Event", eventSchema);

export default Event