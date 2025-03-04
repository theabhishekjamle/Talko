import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const httpserver = http.createServer(app);

const io = new Server(httpserver, {
    cors: {
        origin: ["http://localhost:3000"],
        credentials: true
    }
});

export function getRecieverSocketId(userId){
    return userSocketMap[userId];
}

//store online users
const userSocketMap = {}; //{userId:socketId}

io.on("connection", (socket) => {

    const userId = socket.handshake.query.userId;
    if(userId){
        userSocketMap[userId] = socket.id;
    }
    io.emit("getOnlineUsers",Object.keys(userSocketMap))
    socket.on("disconnect", () => {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    });
});

export { io, app, httpserver };
