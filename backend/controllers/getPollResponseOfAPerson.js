import PollResponse from '../models/pollResponse.js';

export default async function getPollResponseOfAPerson(req, res) {
    const { dataId: pollId, email } = req.query;
    let response = undefined;
    try {
        response = await PollResponse.findOne({ pollId, email })
    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }

    if (response) {
        return res.json({ success: true, response: response.response })
    }

    return res.json({ success: false, message: "No previous response found" })
}