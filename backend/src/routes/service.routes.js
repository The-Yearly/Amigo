import express from "express";
import {
  createService,
  getServices,
  getServiceById,
  getMyServices,
  editService,
  deleteService,
  myserviceStats
} from "../controllers/service.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getServices);
router.post("/", protect, createService);
router.post("/edit", protect, editService);
router.delete("/delete/:id", protect, deleteService);
router.get("/my", protect, getMyServices);
router.get("/my/stats", protect, myserviceStats);
router.get("/:id", getServiceById);

export default router;
