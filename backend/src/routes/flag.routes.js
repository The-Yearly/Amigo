import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { createFlag } from "../controllers/flag.controller.js";

const router = express.Router();

// POST route for creating flags (handles both USER and ERRAND)
router.post("/", protect, createFlag);

export default router;