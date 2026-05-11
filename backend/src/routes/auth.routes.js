import express from "express";
import { } from "../controllers/service.controller.js";
import { forgotPassword, login, resetPassword, signup, verifyOtp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
export default router;
