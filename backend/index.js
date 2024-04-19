import express, { json } from 'express'
const app = express();
const port = 5003;

import { fileURLToPath } from 'url';
import path from 'path';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import authRouter from './routes/authRoutes.js'
import createRouter from './routes/createRouter.js'
import dataRouter from './routes/dataRouter.js'

import cors from 'cors'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log("Connected to Database");
    } catch (e) {
        console.log("Problem connecting to Database", e);
    }
}
connectToDatabase()

app.use(cors())


app.use("/", authRouter)
app.use("/", dataRouter)
app.use("/create", createRouter)


app.listen(port, () => {
    console.log("Server running on server " + port);
})