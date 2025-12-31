import express from "express";
import { login, register, logout, verify } from "../controllers/authController.js";

const authrouter = express.Router();

authrouter.post('/register',register);
authrouter.post('/login',login);
authrouter.post('/logout',logout);
authrouter.get('/verify',verify);

export default authrouter;