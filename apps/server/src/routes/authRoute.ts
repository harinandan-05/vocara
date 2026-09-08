import express from "express";
import { googleAuthController, getMeController } from "../controllers/authController";

const authRoute = express.Router();

authRoute.post("/google", googleAuthController);
authRoute.get("/me", getMeController);

export default authRoute;
