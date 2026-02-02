import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import testRouter from "./routes/testRouter.js"
import connectDB from "./config/mongodb.js";
import authrouter from "./routes/authRouter.js";
import watchListRouter from "./routes/watchListRouter.js"
import favouritesRouter from "./routes/favouritesRouter.js";

dotenv.config();

const app = express();

const allowedOrigins = [
    process.env.NODE_ENV === "production"
        ? "https://cinestack-eta.vercel.app"
        : "http://localhost:5173"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));


app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/auth", authrouter);
app.use("/api/test", testRouter);
app.use("/api/watchList", watchListRouter);
app.use("/api/favourites", favouritesRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
