import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/mongodb.js';

import cookieParser from "cookie-parser";
import authrouter from './routes/authRouter.js';
const app=express();
dotenv.config();
app.use(express.json());

connectDB();
app.use(cookieParser());
app.use("/api/auth",authrouter);

const PORT=process.env.PORT || 4000 ;

app.listen(PORT,()=>{console.log(`Server is running at ${PORT}`)});