import express from "express";
import {
  sendMessage,
  getMessages,
  getConversations,
  markAsRead,
  getConversationById,
} from "../controllers/message.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// router.get("/", protect, getConversations);
router.post("/", protect, sendMessage);
router.patch("/:serviceRequestId/read", protect, markAsRead); // New route
router.get("/:serviceRequestId/meta", protect, getConversationById);
router.get("/:serviceRequestId", protect, getMessages);

export default router;
