import mongoose from "mongoose";

const { Schema } = mongoose;

const campSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    email: {
        type: String
    }
})

const Camp = mongoose.model("Camp", campSchema)

export default Camp