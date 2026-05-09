// controllers/user.controller.js
import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getProfile = asyncHandler(async (req, res) => {
  const credsString = req.cookies.creds;
  
  if (!credsString) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  let userId;
  try {
    const creds = JSON.parse(credsString);
    userId = creds.uid;
  } catch (err) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      department: true,
      profileImage: true,
      bio: true  // ✅ Added bio
    }
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.json(user);
});

export const updateProfile = asyncHandler(async (req, res) => {
  const credsString = req.cookies.creds;
  
  if (!credsString) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  let userId;
  try {
    const creds = JSON.parse(credsString);
    userId = creds.uid;
  } catch (err) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  
  const { name, department, profileImage, bio } = req.body;  // ✅ Added bio
  
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { name, department, profileImage, bio },  // ✅ Added bio
    select: {
      name: true,
      department: true,
      profileImage: true,
      bio: true  // ✅ Added bio
    }
  });
  
  return res.json(updatedUser);
});