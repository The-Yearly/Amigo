// controllers/user.controller.js
import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      department: true,
      profileImage: true,
      bio: true,
      services:{
        select:{title:true,description:true,id:true,image:true,price:true}
      }
     
    },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  console.log(user)
  return res.json(user);
});

export const updateProfile = asyncHandler(async (req, res) => {
  console.log("IJskd", req.body);
  const { id, name, department, profileImage, bio } = req.body; // ✅ Added bio

  const updatedUser = await prisma.user.update({
    where: { id: id },
    data: { name, department, profileImage, bio }, // ✅ Added bio
    select: {
      name: true,
      department: true,
      profileImage: true,
      bio: true, // ✅ Added bio
    },
  });

  return res.json(updatedUser);
});
