import express from "express";
import {
  acceptRequest,
  completeRequest,
  createRequest,
  getIncomingRequests,
  getMyRequests,
  getProviderRequests,
  getProviderStats,
  getRequestDetail,
  rejectRequest,
  startRequest,
  newRequest,
  updateRequestStatus,
} from "../controllers/request.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create
router.post("/", protect, createRequest);

// User requests
router.get("/my", protect, getMyRequests);

// Provider requests
router.get("/provider", protect, getProviderRequests);

// Incoming requests
router.get("/requests", protect, getIncomingRequests);

// Stats
router.get("/stats", protect, getProviderStats);

// Request detail
router.get("/requests/:id", protect, getRequestDetail);

// Request actions
router.patch("/requests/:id/accept", protect, acceptRequest);
router.patch("/requests/:id/reject", protect, rejectRequest);
router.patch("/requests/:id/start", protect, startRequest);
router.patch("/requests/:id/complete", protect, completeRequest);

// Generic status update
router.patch("/:id/status", protect, updateRequestStatus);
router.post("/newRequest",protect,newRequest)
router.post("/newRequest",protect,newRequest)
export default router;
