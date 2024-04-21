import express from 'express'

import { refreshAccessToken } from '../utils/authToken.js'

const router = express.Router();

router.get('/:role', refreshAccessToken)


export default router;