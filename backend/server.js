//package imports
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//routes
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

//data base imports
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

// const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000

app.use(express.json()); // for parsing application/json
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);



// app.get("/",(reqq,res)=>{
//     res.send("Hello World")
// });

server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`)
});