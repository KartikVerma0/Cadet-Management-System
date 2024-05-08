import permissionsMapping from "./permissionsMapping.js";

const defaultProbationSeniorPermissions = [
    permissionsMapping.canCreateEvent,
    permissionsMapping.canCreatePoll,
    permissionsMapping.canCreateNotification,
    permissionsMapping.canRespondToEvent,
    permissionsMapping.canRespondToPoll,
    permissionsMapping.canSeePollResponses,
    permissionsMapping.canDeletePoll,
    permissionsMapping.canDeleteEvent,
    permissionsMapping.canDeleteNotification,
    permissionsMapping.canEditEvent,
    permissionsMapping.canEditPoll,
    permissionsMapping.canEditNotification,
    permissionsMapping.canSeeProbationCadets,
    permissionsMapping.canApprovePendingExcuses,
    permissionsMapping.canUploadAttendanceProof,
    permissionsMapping.canMarkProbationerAttendance,
]

export default defaultProbationSeniorPermissions