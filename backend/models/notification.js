import mongoose from 'mongoose'
const { Schema } = mongoose;

const notificationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    postedDate: {
        type: String,
        default: new Date().toLocaleString({ timeZone: 'Asia/Kolkata' })
    }
})

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification