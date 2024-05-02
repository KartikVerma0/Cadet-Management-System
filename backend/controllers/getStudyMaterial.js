import StudyMaterial from '../models/studyMaterial.js'

export default async function getStudyMaterial(req, res) {
    const { nccWing } = req.query;
    let studyMaterials = undefined;
    try {
        studyMaterials = nccWing === "All" ? await StudyMaterial.find() :
            await StudyMaterial.find({ nccWing })
    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }

    if (studyMaterials) {
        return res.json({ success: true, studyMaterials })
    }

    return res.json({ success: false, message: "No study material found" }).status(404)
}