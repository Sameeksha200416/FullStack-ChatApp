import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path";
import dotenv from "dotenv";
import { connectDB } from "./src/lib/db.js";

dotenv.config();

import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
import {app,server} from "./src/lib/socket.js";

const PORT = process.env.PORT || 5001;
const _dirname = path.resolve();

app.use(express.urlencoded({ limit: "10mb", extended: true }))
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.get("/",(req,res) => {
    res.send("API is running");
})

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(_dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(_dirname, "../frontend/dist/index.html"));
    });
}

server.listen(PORT, () => {
    console.log("Server is running on PORT:"+ PORT);
    connectDB();
});
