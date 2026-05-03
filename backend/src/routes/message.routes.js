import express from "express";
import {
    sendMessage,
    getMessages,
    getConversations,
} from "../controllers/message.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/:serviceRequestId", protect, getMessages);
router.get("/", protect, getConversations);

export default router;