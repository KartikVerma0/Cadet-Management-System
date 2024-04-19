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
    }
})

const Poll = mongoose.model("Poll", pollSchema);

export default Poll