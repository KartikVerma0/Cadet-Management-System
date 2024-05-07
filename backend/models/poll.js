import mongoose from "mongoose";

const { Schema } = mongoose;

const pollSchema = new Schema({
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

const Poll = mongoose.model("Poll", pollSchema);

export default Poll