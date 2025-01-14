import { Server } from "socket.io";
import express from "express";
import http from "http";


const app = express();

// app.use((req, res, next) => {
//     res.setTimeout(5000, () => {
//       res.status(504).send("Gateway Timeout");
//     });
//     next();
//   });

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

const userSocketMap = {}; //{userId: socketId}

// retrive reciver,s socket ID
export const getReciverSocketId = (reciverId) => {
    return userSocketMap[reciverId];
}


io.on("connection", (socket) => {
    console.log("a user connected", socket.id, );

    const userId = socket.handshake.query.userId;
    if(userId != "undefined") userSocketMap[userId] = socket.id;

    // emit is used to send events to all the  connected clients
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    
    // socket.on is used to listen to events from the client. can be used both sides
    socket.on("disconnect",() => {
        console.log("a user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export {app, io, server };