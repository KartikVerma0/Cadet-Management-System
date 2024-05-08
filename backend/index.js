import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import createRouter from "./routes/createRouter.js";
import dataRouter from "./routes/dataRouter.js";
import deleteRouter from "./routes/deleteRouter.js";
import dotenv from "dotenv";
import enrolledUserRouter from "./routes/enrolledUserRouter.js";
import excuseRouter from "./routes/excuseRouter.js";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import refreshRouter from "./routes/refresh.js";
import responseRouter from "./routes/responseRouter.js";
import userRouter from "./routes/userRouter.js";
import { fileURLToPath } from "url";
import { corsOptions } from "./config/corsOptions.js";
import { credentials } from "./middleware/middleware.js";
import { verifyJWT } from "./middleware/verifyJWT.js";

const app = express();
const port = 5003;



dotenv.config();





const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb' }));
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
app.use("/user", userRouter)
app.use("/create", createRouter)
app.use("/response", responseRouter)
app.use("/delete", deleteRouter)
app.use("/excuse", excuseRouter)
app.use("/enrolled", enrolledUserRouter)

app.use("*", (req, res) => {
    return res.json({ success: false, message: "Error Route" }).status(404)
})

app.listen(port, () => {
    console.log("Server running on server " + port);
})