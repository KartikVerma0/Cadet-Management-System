import express from 'express'

import { refreshAccessToken } from '../utils/authToken.js'

const router = express.Router();

router.get('/', async (req, res) => {
    await refreshAccessToken(req, res)
})


export default router;