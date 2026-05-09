// routes/user.routes.js
import express from "express";
import { getProfile, updateProfile } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();
// GET /api/user/profile
router.get("/profile/:id", getProfile);
router.put("/update",protect, updateProfile);

export default router;
