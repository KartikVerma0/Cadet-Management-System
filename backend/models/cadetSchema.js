import mongoose from "mongoose";

const { Schema } = mongoose;

const cadetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    address: {
        type: String,
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
    bloodGroup: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    nearestRailwayStation: {
        type: String,
        required: true
    },
    nearestPoliceStation: {
        type: String,
        required: true
    },
    identificationMark1: {
        type: String,
        required: true
    },
    identificationMark2: {
        type: String,
        required: true
    },
    nccUnit: {
        type: String,
        required: true
    },
    nccWing: {
        type: String,
        required: true
    },
    enrollmentNumber: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    rollNumber: {
        type: Number,
        required: true
    },
    academicYear: {
        type: Number,
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
    attendanceOverallDetailsId: {
        type: Schema.Types.ObjectId,
    },
    refreshToken: {
        type: String
    }
    //add allowed boolean to denote if an account is approved or not
})

const Cadet = mongoose.model("Cadet", cadetSchema);

export default Cadet;