import mongoose from "mongoose";

const { Schema } = mongoose;

const ano_ctoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    nccWing: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    permissions: [
        //add permissions
    ],
    accountApproved: {
        type: Boolean,
        required: true,
        default: false
    },
    refreshToken: {
        type: String
    }
})

const ANO_CTO = mongoose.model("ANO_CTO", ano_ctoSchema);

export default ANO_CTO;