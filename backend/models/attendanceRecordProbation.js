import mongoose from "mongoose";

const { Schema } = mongoose;

const attendanceRecordProbationSchema = new Schema({
    eventID: {
        type: String,
        required: true
    },
    presentCadetsID: {
        type: [Schema.Types.ObjectId],
        default: [],
        required: true,
        ref: 'Probationer'
    }
})

const AttendanceRecordProbation = mongoose.model('AttendanceRecordProbation', attendanceRecordProbationSchema)
export default AttendanceRecordProbation