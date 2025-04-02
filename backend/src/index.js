import express from "express";
import  dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";
import {app,server } from './lib/socket.js'

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

dotenv.config()
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

const  PORT = process.env.PORT
app.use(express.json())
app.use("/",authRoutes) 
app.use("/",messageRoutes) 

app.get('/', (res,req) => {
    console.log('on / page');
    
})

server.listen(PORT,()=>{
    console.log("server is running" + PORT);
    connectDB()
})
