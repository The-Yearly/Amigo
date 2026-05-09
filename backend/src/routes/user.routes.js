// routes/user.routes.js
import express from "express";
import { getProfile, updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

// GET /api/user/profile
router.get("/profile", getProfile);
router.put("/update", updateProfile);

export default router;
