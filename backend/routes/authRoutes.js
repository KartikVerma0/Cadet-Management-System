import express from 'express'

import signupController from '../controllers/signupController.js'
import loginController from '../controllers/loginController.js'


import { handleLogout } from '../utils/authToken.js'
const router = express.Router();

router.post("/signup/:role", signupController)

router.post('/login/:role', loginController)


router.get("/logout/:role", handleLogout)

export default router;