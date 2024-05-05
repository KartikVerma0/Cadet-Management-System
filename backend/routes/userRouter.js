import changeUserPassword from "../controllers/changeUserPassword.js";
import express from "express";
import getUserData from "../controllers/getUserData.js";
import setUserData from "../controllers/setUserData.js";

const Router = express.Router();

Router.get("/user", getUserData)
Router.post("/user", setUserData)
Router.post("/user/changePwd", changeUserPassword)

export default Router