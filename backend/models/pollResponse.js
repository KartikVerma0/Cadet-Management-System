import mongoose from 'mongoose'

const { Schema } = mongoose

const pollResponseSchema = new Schema({
    pollId: {
        type: Schema.Types.ObjectId,
        ref: 'Poll',
        required: true
    },
    userDetails: {
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
    },
    response: {
        type: Boolean,
        required: true
    }
})

const PollResponse = mongoose.model('PollResponse', pollResponseSchema)

export default PollResponse