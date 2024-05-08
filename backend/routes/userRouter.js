import approveCadet from "../controllers/approveCadet.js";
import changeUserPassword from "../controllers/changeUserPassword.js";
import deleteCadet from "../controllers/deleteCadet.js";
import demoteCadet from "../controllers/demoteCadet.js";
import express from "express";
import getUnapprovedCadet from "../controllers/getUnapprovedCadets.js";
import getUserData from "../controllers/getUserData.js";
import permissionsMapping from "../config/permissionsMapping.js";
import promoteCadet from "../controllers/promoteCadet.js";
import setUserData from "../controllers/setUserData.js";
import verifyPermissions from "../middleware/verifyPermissions.js";

const Router = express.Router();

Router.get("/", getUserData)
Router.post("/", setUserData)
Router.post("/changePwd", changeUserPassword)
Router.put("/promote", verifyPermissions(permissionsMapping.canAuthorizeWingSenior, permissionsMapping.canAuthorizeProbationSenior), promoteCadet)
Router.put("/demote", verifyPermissions(permissionsMapping.canDemoteWingSenior, permissionsMapping.canDemoteProbationSenior), demoteCadet)
Router.get("/unapproved", verifyPermissions(permissionsMapping.canApproveCadetAccounts), getUnapprovedCadet)
Router.put("/approve", verifyPermissions(permissionsMapping.canApproveCadetAccounts), approveCadet)
Router.delete("/", verifyPermissions(permissionsMapping.canApproveCadetAccounts), deleteCadet)

export default Router