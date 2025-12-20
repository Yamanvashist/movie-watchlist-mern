import userModel from "../models/userModels.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const cookieConfig={
    httpOnly:true,
    secure:process.env.NODE_ENV==="production",
    sameSite:process.env.NODE_ENV==="production"?"none":"strict",
    maxAge: 7*24*60*60*1000
};

export const register =async(req,res)=>{
    const {name,email,password}=req.body;
    if(!email || !name || !password){
        return res.json({success:false,message:"credentials not present"});
    }
    try{
        const existinguser= await userModel.findOne({email});
        if(existinguser){
            return res.json({success:false,message:"user already exist"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new userModel({name,email,password:hashedPassword});
        await user.save();
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d",});
        res.cookie("token",token,cookieConfig);
        return res.json({success:true,message:"successful"});
        

    }catch(error){
        return res.json({success:false,message:error.message});
    }
}