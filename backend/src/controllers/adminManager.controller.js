import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
export const fetchAdmins = asyncHandler(async (req, res) => {
  console.log("Sj");
  const admins = await prisma.user.findMany({
    where: {
      isAdmin: true,
    },
    select: {
      id: true,
      profileImage: true,
      name: true,
      email: true,
      isAdmin: true,
      admin: true,
    },
  });

  res.status(200).json({ data: admins });
});

export const fetchUsers = asyncHandler(async (req, res) => {
  const admins = await prisma.user.findMany({
    select: {
      id: true,
      profileImage: true,
      name: true,
      email: true,
      isAdmin: true,
    },
    orderBy: {
      isAdmin: "asc",
    },
  });

  res.status(200).json({ data: admins });
});

export const managePermissions = asyncHandler(async (req, res) => {
  const perms = req.body;
  const admin = await prisma.admin.findUnique({
    where: {
      id: perms.id,
    },
  });
  if (!admin) {
    res.status(403).json({ message: "Admin Not Found" });
  } else {
    const response = await prisma.admin.update({
      where: {
        id: perms.id,
      },
      data: {
        isSuperAdmin: perms.perm.isSuperAdmin,
        canAdd: perms.perm.canAdd,
        canKick: perms.perm.canKick,
        canOverride: perms.perm.canOverride,
      },
    });
    if (response) {
      res.status(200).json({ message: "Success" });
    }
  }
});

export const searchAdmins = asyncHandler(async (req, res) => {
  const search = req.params.search;
  const admins = await prisma.user.findMany({
    where: {
      isAdmin: true,
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      id: true,
      profileImage: true,
      name: true,
      email: true,
      isAdmin: true,
      admin: true,
    },
    take: 10,
  });
  console.log(admins);
  res.status(200).json({ data: admins });
});

export const addAdmin = asyncHandler(async (req, res) => {
  const id = req.body.userIds[0];
  console.log(id, "2 trailer park");
  const findUser = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
  if (!findUser) {
    res.status(404).json({ message: "Invalid User Id" });
  }
  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        isAdmin: true,
      },
    });
    await prisma.admin.create({
      data: {
        id: id,
        canAdd: false,
        canKick: false,
        canOverride: false,
        isSuperAdmin: false,
      },
    });
    res.status(200).json({ message: "Admin Created" });
  } catch (err) {
    res.json({ message: err });
  }
});

export const removeAdmin = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const findUser = await prisma.admin.findFirst({
    where: {
      id: id,
    },
  });
  if (!findUser) {
    res.status(404).json({ message: "Invalid User Id" });
  }
  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        isAdmin: false,
      },
    });
    await prisma.admin.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ message: "Admin Deleted" });
  } catch (err) {
    res.json({ message: err });
  }
});


export const fetchProfile = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    }
  });
  if (!user) {
    res.status(404).json({ message: "User Not Found" });
  }
  else {
    res.status(200).json({ data: user });
  }
})




export const updateProfile = asyncHandler(async (req, res) => {
  const { name, bio, profileImage, newPassword, department } = req.body;
  console.log(req.user)
  // Get ID from the middleware hand-off (req.user.id)
  const adminId = req.user.uid;

  const updateData = {
    name,
    bio,
    profileImage,
    department
  };

  // Hash the password with bcrypt (same as signup)
  if (newPassword) {
    updateData.password = await bcrypt.hash(newPassword, 10);
  }

  const updatedUser = await prisma.user.update({
    where: { id: adminId },   // now a string
    data: updateData,
  });

  res.status(200).json({
    message: "Profile updated successfully",
    data: { name: updatedUser.name, email: updatedUser.email }
  });
});


export const getFlagged = asyncHandler(async (req, res) => {
  try {
    const flagged = await prisma.flagRecord.findMany({
      select: {
        id: true,
        type: true,
        time: true,
        status: true,
        reason: true,
        adminreason: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profileImage: true,
          },
        },
        service: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    res.status(200).json({ data: flagged });
  } catch (err) {
    res.json({ message: err });
  }
});
