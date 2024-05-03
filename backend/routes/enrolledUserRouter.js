import Cadet from "../models/cadetSchema.js";
import Probationer from "../models/probationUser.js";
import express from "express";
import permissionsMapping from "../../frontend/src/permissionsMapping.js";
import verifyPermissions from "../middleware/verifyPermissions.js";

const Router = express.Router()

Router.get("/cadets", verifyPermissions(permissionsMapping.canSeeEnrolledCadets), async (req, res) => {
    try {
        const enrolledCadets = await Cadet.find()
        const academicYearAnalyticalData = await Cadet.aggregate([
            {
                $group: {
                    _id: "$academicYear",  // Group by academic year
                    count: { $sum: 1 }  // Count the number of cadets in each group
                }
            },
            {
                $project: {
                    _id: 0,
                    academicYear: "$_id",  // Include academic year from the grouped _id
                    count: 1  // Include the count
                }
            }
        ]);
        const genderAnalyticalData = await Cadet.aggregate([
            {
                $group: {
                    _id: "$gender",  // Group by the 'gender' field
                    count: { $sum: 1 }  // Count the number of cadets in each group
                }
            },
            {
                $project: {
                    _id: 0,
                    gender: "$_id",  // Include academic year from the grouped _id
                    count: 1  // Include the count
                }
            }
        ]);
        const wingAnalyticalData = await Cadet.aggregate([
            {
                $group: {
                    _id: "$nccWing",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    nccWing: "$_id",
                    count: 1
                }
            }
        ]);
        return res.json({ success: true, message: "Successfully fetched enrolled cadets data", enrolledCadets, academicYearAnalyticalData, genderAnalyticalData, wingAnalyticalData })
    } catch (error) {
        return res.json({ success: false, message: "Problem fetching enrolled cadets data, Error:\n" + error.message }).status(500)
    }
})

Router.get("/probation", verifyPermissions(permissionsMapping.canSeeProbationCadets), async (req, res) => {
    try {
        const probationCadets = await Probationer.find()
        const academicYearAnalyticalData = await Probationer.aggregate([
            {
                $group: {
                    _id: "$academicYear",  // Group by academic year
                    count: { $sum: 1 }  // Count the number of cadets in each group
                }
            },
            {
                $project: {
                    _id: 0,
                    academicYear: "$_id",  // Include academic year from the grouped _id
                    count: 1  // Include the count
                }
            }
        ]);
        const genderAnalyticalData = await Probationer.aggregate([
            {
                $group: {
                    _id: "$gender",  // Group by the 'gender' field
                    count: { $sum: 1 }  // Count the number of cadets in each group
                }
            },
            {
                $project: {
                    _id: 0,
                    gender: "$_id",  // Include academic year from the grouped _id
                    count: 1  // Include the count
                }
            }
        ]);
        const wingAnalyticalData = await Probationer.aggregate([
            {
                $group: {
                    _id: "$nccWing",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    nccWing: "$_id",
                    count: 1
                }
            }
        ]);
        return res.json({ success: true, message: "Successfully fetched probation cadets data", probationCadets, academicYearAnalyticalData, genderAnalyticalData, wingAnalyticalData })
    } catch (error) {
        return res.json({ success: false, message: "Problem fetching probation cadets data, Error:\n" + error.message }).status(500)
    }
})

export default Router