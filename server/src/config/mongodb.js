import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB=async()=>{
    try{
        
    await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`);
    console.log("mongodb connected");

    }catch(error){
        console.error("mongodb connection failed",error.message);
        process.exit(1);
    }
    
};
export default connectDB;