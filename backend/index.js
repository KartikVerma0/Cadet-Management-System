import express, { json } from 'express'
const app = express();
const port = 5003;

import { fileURLToPath } from 'url';
import path from 'path';

import cookieParser from 'cookie-parser';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import authRouter from './routes/authRoutes.js'
import refreshRouter from './routes/refresh.js'
import createRouter from './routes/createRouter.js'
import dataRouter from './routes/dataRouter.js'
import responseRouter from './routes/responseRouter.js'
import deleteRouter from './routes/deleteRouter.js'

import { credentials } from './middleware/middleware.js';
import { corsOptions } from './config/corsOptions.js';
import cors from 'cors'

import { verifyJWT } from './middleware/verifyJWT.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser())

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log("Connected to Database");
    } catch (e) {
        console.log("Problem connecting to Database", e);
    }
}
connectToDatabase()

app.use(credentials)
app.use(cors(corsOptions))


app.use("/", authRouter)
app.use("/refresh", refreshRouter)

app.use(verifyJWT)
app.use("/", dataRouter)
app.use("/create", createRouter)
app.use("/response", responseRouter)
app.use("/delete", deleteRouter)

app.use("*", (req, res) => {
    return res.json({ success: false, message: "Error Route" }).status(404)
})

app.listen(port, () => {
    console.log("Server running on server " + port);
})