import PollResponse from '../models/pollResponse.js';

export default async function getAllResponsesOfAPoll(req, res) {
    const { pollId } = req.query;
    let pollResponses = undefined;
    try {
        pollResponses = await PollResponse.find({ pollId })
    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }

    if (pollResponses.length) {
        return res.json({ success: true, pollResponses })
    }
    return res.json({ success: false, message: "No responses found" })
}