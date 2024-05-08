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
        unique: true,
        min: 1000000000,
        max: 9999999999
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
        permissionsMapping.canEditNotification,
        permissionsMapping.canSeeEnrolledCadets,
        permissionsMapping.canSeeProbationCadets,
        permissionsMapping.canUploadStudyMaterial,
        permissionsMapping.canApprovePendingExcuses,
        permissionsMapping.canMarkCadetAttendance,
        permissionsMapping.canMarkProbationerAttendance,
        permissionsMapping.canAuthorizeWingSenior,
        permissionsMapping.canDemoteWingSenior,
        permissionsMapping.canDemoteProbationSenior,
        permissionsMapping.canApproveCadetAccounts
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