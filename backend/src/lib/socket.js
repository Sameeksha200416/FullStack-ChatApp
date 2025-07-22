import {Server} from "socket.io";
import http from "http";
import express from "express";


const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: [
            "http://localhost:5173",
            "https://full-stack-chat-app-mkbr.vercel.app",
            "https://full-stack-chat-app-6njh.vercel.app",
            "https://full-stack-chat-app-6njh-git-main-sameeksha200416s-projects.vercel.app"
        ],
        credentials: true
    }
});
const userSocketMap = {};
export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

// //use to store online user
// const userSocketMap = {}; //{userId: socketId}

io.on("connection", (socket) => {
    console.log("A user connected",socket.id);

    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId] = socket.id;

    //io.emit() is used to send event to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export {io,app,server};