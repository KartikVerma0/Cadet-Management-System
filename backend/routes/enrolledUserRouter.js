import Cadet from "../models/cadetSchema.js";
import Probationer from "../models/probationUser.js";
import express from "express";
import getUsersData from "../controllers/getUsersData.js";
import permissionsMapping from "../config/permissionsMapping.js";
import verifyPermissions from "../middleware/verifyPermissions.js";

const Router = express.Router()

Router.get("/cadets", verifyPermissions(permissionsMapping.canSeeEnrolledCadets), getUsersData(Cadet))

Router.get("/probation", verifyPermissions(permissionsMapping.canSeeProbationCadets), getUsersData(Probationer))

export default Router