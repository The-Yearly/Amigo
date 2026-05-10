import express from "express";
import {} from "../controllers/service.controller.js";
import { login, signup, verifyOtp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
export default router;