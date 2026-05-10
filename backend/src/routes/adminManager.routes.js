import express from "express";

import {
  fetchAdmins,
  managePermissions,
  searchAdmins,
  fetchUsers,
  addAdmin,
  removeAdmin,
  getFlagged,
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
export default router;
