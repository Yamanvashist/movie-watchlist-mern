import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/mongodb.js';

const app=express();
dotenv.config();
connectDB();
const PORT=process.env.PORT ;

app.listen(PORT,()=>{console.log(`Server is running at ${PORT}`)});