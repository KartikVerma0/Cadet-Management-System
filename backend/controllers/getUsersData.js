const getUsersData = (group) => {
    return async (req, res) => {
        try {
            const users = await group.find()
            const academicYearAnalyticalData = await group.aggregate([
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
            const genderAnalyticalData = await group.aggregate([
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
            const wingAnalyticalData = await group.aggregate([
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
            return res.json({ success: true, message: "Successfully fetched enrolled cadets data", users, academicYearAnalyticalData, genderAnalyticalData, wingAnalyticalData })
        } catch (error) {
            return res.json({ success: false, message: "Problem fetching enrolled cadets data, Error:\n" + error.message }).status(500)
        }
    }
}

export default getUsersData