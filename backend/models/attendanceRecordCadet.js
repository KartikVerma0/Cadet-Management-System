import mongoose from "mongoose";

const { Schema } = mongoose;

const attendanceRecordCadetSchema = new Schema({
    eventID: {
        type: String,
        required: true
    },
    presentCadetsID: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: "Cadet"
    }
})

const AttendanceRecordCadet = mongoose.model('AttendanceRecordCadet', attendanceRecordCadetSchema)
export default AttendanceRecordCadet