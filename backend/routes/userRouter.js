import express from 'express'
import getUserData from '../controllers/getUserData.js';
import setUserData from '../controllers/setUserData.js'

const Router = express.Router();

Router.get("/user", getUserData)
Router.post("/user", setUserData)

export default Router