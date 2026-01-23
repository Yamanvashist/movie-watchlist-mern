import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { addWatchList,deleteWatchList,getWatchList } from "../controllers/watchlistController.js"

const router =express.Router();

router.post("/",authMiddleware,addWatchList);
router.get("/",authMiddleware,getWatchList);
router.delete("/",authMiddleware,deleteWatchList);

export default router;