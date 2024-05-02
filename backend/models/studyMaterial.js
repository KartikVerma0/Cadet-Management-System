import mongoose from 'mongoose'
const { Schema } = mongoose;

const studyMaterialSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    nccWing: {
        type: String,
        required: true
    },
    files: [{
        type: String,
        required: true
    }],
    createdBy: {
        type: String,
        required: true
    },
    postedDate: {
        type: String,
        default: new Date().toLocaleString({ timeZone: 'Asia/Kolkata' })
    }
})

const StudyMaterial = mongoose.model("StudyMaterial", studyMaterialSchema);

export default StudyMaterial