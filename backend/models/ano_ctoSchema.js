import mongoose from "mongoose";
import permissionsMapping from "../config/permissionsMapping.js";

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
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    nccWing: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    permissions: {
        type: [Number],
        default: [permissionsMapping.canCreateEvent,
        permissionsMapping.canCreatePoll,
        permissionsMapping.canCreateNotification,
        permissionsMapping.canSeeEventResponses,
        permissionsMapping.canSeePollResponses,
        permissionsMapping.canDeleteEvent,
        permissionsMapping.canDeletePoll,
        permissionsMapping.canDeleteNotification,
        permissionsMapping.canEditEvent,
        permissionsMapping.canEditPoll,
        permissionsMapping.canEditNotification
        ]
    },
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