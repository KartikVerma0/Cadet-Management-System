import mongoose from 'mongoose'

const { Schema } = mongoose

const pollResponseSchema = new Schema({
    pollId: {
        type: Schema.Types.ObjectId,
        ref: 'Poll',
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

const PollResponse = mongoose.model('PollResponse', pollResponseSchema)

export default PollResponse