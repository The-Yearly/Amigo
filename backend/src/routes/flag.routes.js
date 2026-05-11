import express from "express";

import { protect } from "../middleware/auth.middleware.js";
import { flagUser } from "../controllers/flag.controller.js";
const router = express.Router();

router.get("/", protect, flagUser);

export default router;
