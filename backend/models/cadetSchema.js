import mongoose from "mongoose";
import permissionsMapping from "../config/permissionsMapping.js";

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
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    rollNumber: {
        type: Number,
        required: true,
        unique: true
    },
    academicYear: {
        type: Number,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    permissions: {
        type: [Number],
        default: [permissionsMapping.canRespondToEvent, permissionsMapping.canRespondToPoll]
    },
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

})

const Cadet = mongoose.model("Cadet", cadetSchema);

export default Cadet;