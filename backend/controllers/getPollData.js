import Poll from '../models/poll.js';

export default async function getPollData(req, res) {
    const { pollId } = req.query;
    let pollInfo = undefined;
    try {
        pollInfo = await Poll.findById(pollId)
    } catch (err) {
        return res.json({ success: false, message: "Server Error" }).status(500)
    }

    if (pollInfo) {
        return res.json({ success: true, pollInfo })
    }

    return res.json({ success: false, message: "Invalid poll selected" }).status(404)
}