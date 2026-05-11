import express from "express";

import {
  fetchAdmins,
  managePermissions,
  searchAdmins,
  fetchUsers,
  fetchProfile,
  addAdmin,
  removeAdmin,
  getFlagged,
  updateProfile,
  getAuditLogs,
  getFlaggedById,
  updateFlag,
  deleteFlag,
  dismissFlag,
  getUserFlaggedId,
  banUser,
  dismissUserFlag,
  getAdminStats,
} from "../controllers/adminManager.controller.js";
import { adminOnly } from "../middleware/auth.middleware.js";
const router = express.Router();
router.get("/getAdmins", adminOnly, fetchAdmins);
router.put("/managePermissions", adminOnly, managePermissions);
router.get("/searchAdmins/:search", adminOnly, searchAdmins);
router.get("/getAllUsers", adminOnly, fetchUsers);
router.post("/addAdmin", adminOnly, addAdmin);
router.delete("/removeAdmin/:id", adminOnly, removeAdmin);
router.get("/getFlagged", adminOnly, getFlagged);
router.put("/update-profile", adminOnly, updateProfile);
router.get("/profile/:id", adminOnly, fetchProfile);
router.get("/auditLogs", adminOnly, getAuditLogs);
router.get("/getFlaggedId/:id", adminOnly, getFlaggedById);
router.post("/updateFlag/", adminOnly, updateFlag);
router.post("/removeFlag/", adminOnly, deleteFlag);
router.post("/dismissFlag/", adminOnly, dismissFlag);
router.get("/getFlaggedUserId/:id", adminOnly, getUserFlaggedId);
router.post("/removeUserFlag/", adminOnly, banUser);
router.post("/dismissUserFlag/", adminOnly, dismissUserFlag);
router.get("/stats", getAdminStats);
router.get("/flagged", getFlagged);
export default router;
