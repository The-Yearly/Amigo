import express from "express";
import {
    createRequest,
    getMyRequests,
    getProviderRequests,
    updateRequestStatus,
} from "../controllers/request.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createRequest);
router.get("/my", protect, getMyRequests);
router.get("/provider", protect, getProviderRequests);
router.patch("/:id/status", protect, updateRequestStatus);

export default router;
