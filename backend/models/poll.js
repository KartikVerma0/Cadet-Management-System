import mongoose from 'mongoose'
const { Schema } = mongoose;

const pollSchema = new Schema({
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
    },
    responses: [
        {
            email: {
                type: String,
                required: true,
                unique: true
            },
            response: {
                type: Boolean,
                required: true
            },
            _id: false,
        }
    ]
})

const Poll = mongoose.model("Poll", pollSchema);

export default Poll