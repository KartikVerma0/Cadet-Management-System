import mongoose from "mongoose";

const { Schema } = mongoose;

const excuseSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    reasonCategory: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    nccWing: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    files: [{
        type: String,
        required: true
    }],
    eventId: {
        type: Schema.Types.ObjectId,
        ref: "Event"
    },
    isPending: {
        type: Boolean,
        default: true
    },
    isRejected: {
        type: Boolean,
        default: false
    },
    postedDate: {
        type: String,
        default: new Date().toLocaleString({ timeZone: 'Asia/Kolkata' })
    }
})

const Excuse = mongoose.model("Excuse", excuseSchema)

export default Excuse