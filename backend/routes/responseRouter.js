import express from 'express'

import permissionsMapping from '../config/permissionsMapping.js'
import verifyPermissions from '../middleware/verifyPermissions.js'

import getAllResponsesOfAPoll from '../controllers/getAllResponsesOfAPoll.js';
import getAllResponsesOfAnEvent from '../controllers/getAllResponsesOfAnEvent.js';

import getPollResponseOfAPerson from '../controllers/getPollResponseOfAPerson.js';
import getEventResponseOfAPerson from '../controllers/getEventResponseOfAPerson.js';

import respondToEvent from '../controllers/respondToEvent.js';
import respondToPoll from '../controllers/respondToPoll.js';

const Router = express.Router()

Router.get("/allpollresponses", verifyPermissions(permissionsMapping.canSeePollResponses), getAllResponsesOfAPoll)

Router.get("/polls", getPollResponseOfAPerson)

Router.post("/polls", verifyPermissions(permissionsMapping.canRespondToPoll), respondToPoll)


Router.get("/alleventresponses", verifyPermissions(permissionsMapping.canSeeEventResponses), getAllResponsesOfAnEvent)

Router.get("/events", getEventResponseOfAPerson)

Router.post("/events", verifyPermissions(permissionsMapping.canRespondToEvent), respondToEvent)
export default Router