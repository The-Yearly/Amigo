import express from "express";
import {
  getDashboard,
  getDashboardStats,
  getRecentServices,
} from "../controllers/dashboard.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getDashboard);
router.get("/stats", protect, getDashboardStats);
router.get("/recent-services", protect, getRecentServices);

export default router;
