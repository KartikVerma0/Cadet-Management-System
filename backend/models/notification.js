import mongoose from "mongoose";

const { Schema } = mongoose;

const notificationSchema = new Schema({
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
    }
})

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification