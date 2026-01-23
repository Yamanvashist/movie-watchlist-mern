import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/protected",authMiddleware,(req,res)=>{
    res.json({
        success:true,userId:req.userId
    });
});
export default router;