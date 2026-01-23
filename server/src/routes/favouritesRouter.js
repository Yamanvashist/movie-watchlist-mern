import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addFavourite, getFavourites, deleteFavourite } from "../controllers/favouritesController.js";

const router = express.Router();

router.post("/", authMiddleware, addFavourite);
router.get("/", authMiddleware, getFavourites);
router.delete("/:movieId", authMiddleware, deleteFavourite);

export default router;
