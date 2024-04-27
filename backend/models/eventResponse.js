import mongoose from 'mongoose'

const { Schema } = mongoose

const eventResponseSchema = new Schema({
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    enrollmentNumber: {
        type: String,
    },
    nccWing: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    rollNumber: {
        type: Number,
        required: true,
    },
    academicYear: {
        type: Number,
        required: true
    },
    response: {
        type: Boolean,
        required: true
    }
})

const EventResponse = mongoose.model('EventResponse', eventResponseSchema)

export default EventResponse