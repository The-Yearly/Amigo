import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";

const createLog = async (
  action,
  category,
  description,
  performedById,
  affectedUserId,
  targetId,
  reason,
  color,
  iconName,
  details = {},
) => {
  try {
    await prisma.auditLog.create({
      data: {
        action,
        category,
        description,
        reason,
        type: affectedUserId ? "user" : "system",
        targetId,
        color,
        iconName,
        details,
        performedById,
        affectedUserId,
      },
    });
  } catch (err) {
    console.error("Audit log failed:", err);
  }
};

export const fetchAdmins = asyncHandler(async (req, res) => {

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
  const performerId = req.user.uid; // Get from auth middleware

  const admin = await prisma.admin.findUnique({
    where: { id: perms.id },
    include: { user: true }, // Include user data
  });

  if (!admin) {
    res.status(403).json({ message: "Admin Not Found" });
  } else {
    // Track what changed
    const changes = {};
    if (admin.isSuperAdmin !== perms.perm.isSuperAdmin)
      changes.isSuperAdmin = perms.perm.isSuperAdmin;
    if (admin.canAdd !== perms.perm.canAdd) changes.canAdd = perms.perm.canAdd;
    if (admin.canKick !== perms.perm.canKick)
      changes.canKick = perms.perm.canKick;
    if (admin.canOverride !== perms.perm.canOverride)
      changes.canOverride = perms.perm.canOverride;

    const response = await prisma.admin.update({
      where: { id: perms.id },
      data: {
        isSuperAdmin: perms.perm.isSuperAdmin,
        canAdd: perms.perm.canAdd,
        canKick: perms.perm.canKick,
        canOverride: perms.perm.canOverride,
      },
    });

    if (response) {
      // Get performer name
      const performer = await prisma.user.findUnique({
        where: { id: performerId },
      });

      // Create audit log
      const changesList = Object.entries(changes)
        .map(([k, v]) => `${k}: ${v ? "enabled" : "disabled"}`)
        .join(", ");

      await createLog(
        "Admin Permissions Updated",
        "Permissions",
        `**${performer?.name || "Admin"}** (ID: ${performerId.slice(-4)}) modified permissions for **${admin.user.name}** (ID: ${perms.id.slice(-4)}). Changes: ${changesList}`,
        performerId,
        perms.id,
        perms.id,
        `Permission modifications applied`,
        "bg-[#b7f1b8] text-[#002108]",
        "ShieldCheck",
        { previousPermissions: admin, newPermissions: perms.perm, changes },
      );

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
  const performerId = req.user.uid;

  const findUser = await prisma.user.findFirst({
    where: { id: id },
  });

  if (!findUser) {
    res.status(404).json({ message: "Invalid User Id" });
  }

  try {
    await prisma.user.update({
      where: { id: id },
      data: { isAdmin: true },
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

    // Get performer name
    const performer = await prisma.user.findUnique({
      where: { id: performerId },
    });

    // Create audit log
    await createLog(
      "Admin Added",
      "Permissions",
      `**${performer?.name || "Super Admin"}** (ID: ${performerId.slice(-4)}) elevated **${findUser.name}** (ID: ${id.slice(-4)}) to Admin status`,
      performerId,
      id,
      id,
      "New administrator granted access",
      "bg-[#b7f1b8] text-[#002108]",
      "UserPlus",
      {
        grantedPermissions: {
          canAdd: false,
          canKick: false,
          canOverride: false,
          isSuperAdmin: false,
        },
      },
    );

    res.status(200).json({ message: "Admin Created" });
  } catch (err) {
    res.json({ message: err });
  }
});

export const removeAdmin = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const performerId = req.user.uid;

  const findUser = await prisma.admin.findFirst({
    where: { id: id },
    include: { user: true },
  });

  if (!findUser) {
    res.status(404).json({ message: "Invalid User Id" });
  }

  try {
    await prisma.user.update({
      where: { id: id },
      data: { isAdmin: false },
    });

    await prisma.admin.delete({
      where: { id: id },
    });

    // Get performer name
    const performer = await prisma.user.findUnique({
      where: { id: performerId },
    });

    // Create audit log
    await createLog(
      "Admin Removed",
      "Permissions",
      `**${performer?.name || "Super Admin"}** (ID: ${performerId.slice(-4)}) removed admin privileges from **${findUser.user.name}** (ID: ${id.slice(-4)})`,
      performerId,
      id,
      id,
      "Administrative access revoked",
      "bg-[#ffdad6] text-[#ba1a1a]",
      "UserMinus",
      { previousPermissions: findUser },
    );

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
    },
  });
  if (!user) {
    res.status(404).json({ message: "User Not Found" });
  } else {
    res.status(200).json({ data: user });
  }
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, bio, profileImage, newPassword, department } = req.body;
  console.log(req.user);
  // Get ID from the middleware hand-off (req.user.id)
  const adminId = req.user.uid;

  const updateData = {
    name,
    bio,
    profileImage,
    department,
  };

  // Hash the password with bcrypt (same as signup)
  if (newPassword) {
    updateData.password = await bcrypt.hash(newPassword, 10);
  }

  const updatedUser = await prisma.user.update({
    where: { id: adminId }, // now a string
    data: updateData,
  });

  res.status(200).json({
    message: "Profile updated successfully",
    data: { name: updatedUser.name, email: updatedUser.email },
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

export const getAdminStats = asyncHandler(async (req, res) => {
  const [totalFlags, urgentReports, profileReports, errandReports] =
    await Promise.all([
      prisma.flagRecord.count(),
      prisma.flagRecord.count({ where: { status: "PENDING" } }),
      prisma.flagRecord.count({ where: { type: "USER" } }),
      prisma.flagRecord.count({ where: { type: "ERRAND" } }), // Matches your Enum exactly
    ]);

  res.status(200).json({
    data: {
      totalFlags,
      urgentReports,
      profileReports,
      errandReports,
    },
  });
});
export const getFlaggedNew = asyncHandler(async (req, res) => {
  try {
    // 1. Fetch Counts for Hero Cards
    const [totalFlags, urgentReports, profileReports, errandReports] =
      await Promise.all([
        prisma.flagRecord.count(),
        prisma.flagRecord.count({ where: { status: "PENDING" } }),
        prisma.flagRecord.count({ where: { type: "USER" } }),
        prisma.flagRecord.count({ where: { type: "ERRAND" } }), // Matches your Enum
      ]);

    // 2. Fetch Recent Activity (Limit 5)
    const recentActivity = await prisma.flagRecord.findMany({
      take: 5,
      orderBy: { time: "desc" },
      include: {
        user: {
          select: { id: true, name: true, profileImage: true },
        },
        service: {
          select: { id: true, title: true },
        },
      },
    });

    res.status(200).json({
      stats: {
        totalFlags,
        urgentReports,
        profileReports,
        errandReports,
      },
      recentActivity,
    });
  } catch (err) {
    console.error("Dashboard Fetch Error:", err);
    res.status(500).json({ message: "Failed to fetch admin dashboard data" });
  }
});

export const getFlaggedById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const flagRecord = await prisma.flagRecord.findFirst({
    where: {
      serviceId: id,
    },
  });
  if (!flagRecord) {
    res.status(404).json({ message: "Record Not Found" });
  } else {
    console.log(flagRecord, "All for ");
    res.status(200).json({ data: flagRecord });
  }
});

export const getUserFlaggedId = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const flagRecord = await prisma.flagRecord.findFirst({
    where: {
      userId: id,
    },
  });
  if (!flagRecord) {
    res.status(404).json({ message: "Record Not Found" });
  } else {
    console.log(flagRecord, "All for ");
    res.status(200).json({ data: flagRecord });
  }
});

export const updateFlag = asyncHandler(async (req, res) => {
  try {
    const { id, status, reason } = req.body;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    const allowedStatus = ["PENDING", "UNDER_REVIEW", "COMPLETED"];
    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const flag = await prisma.flagRecord.findUnique({ where: { id } });
    if (!flag) {
      return res.status(404).json({ message: "Flag not found" });
    }

    const flagRecord = await prisma.flagRecord.update({
      where: { id },
      data: { status, reason },
    });

    return res.status(200).json({ message: "Flag Updated" });
  } catch (err) {
    console.error("updateFlag error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const deleteFlag = asyncHandler(async (req, res) => {
  try {
    const { id, serviceId, status, reason, adminreason, userId } = req.body;

    if (!id || !serviceId) {
      return res.status(400).json({ message: "id and serviceId are required" });
    }

    const allowedStatus = ["PENDING", "UNDER_REVIEW", "COMPLETED"];
    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const flag = await prisma.flagRecord.findUnique({ where: { id } });
    if (!flag) {
      return res.status(404).json({ message: "Flag not found" });
    }

    const updatedFlag = await prisma.flagRecord.update({
      where: { id },
      data: {
        status,
        reason,
        adminreason,
        ...(userId ? { userId } : {}),
      },
    });

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await prisma.service.update({
      where: { id: serviceId },
      data: { hide: true },
    });

    const deletedRequests = await prisma.serviceRequest.deleteMany({
      where: { serviceId },
    });

    return res.status(200).json({
      message: "Flag processed successfully",
      data: updatedFlag,
      deletedRequestsCount: deletedRequests.count,
    });
  } catch (err) {
    console.error("deleteFlag error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const banUser = asyncHandler(async (req, res) => {
  try {
    const { id, serviceId, status, reason, adminreason, userId } = req.body;

    if (!id || !userId) {
      return res.status(400).json({ message: "id and serviceId are required" });
    }

    const allowedStatus = ["PENDING", "UNDER_REVIEW", "COMPLETED"];
    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const flag = await prisma.flagRecord.findUnique({ where: { id } });
    if (!flag) {
      return res.status(404).json({ message: "Flag not found" });
    }

    const updatedFlag = await prisma.flagRecord.update({
      where: { id },
      data: {
        status,
        reason,
        adminreason,
        ...(userId ? { userId } : {}),
      },
    });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "Service not found" });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { ban: true },
    });
    const deletedRequests = await prisma.serviceRequest.deleteMany({
      where: {
        OR: [{ providerId: userId }, { requesterId: userId }],
      },
    });
    return res.status(200).json({
      message: "Banned User",
      data: updatedFlag,
      deletedRequestsCount: deletedRequests.count,
    });
  } catch (err) {
    console.error("deleteFlag error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const dismissFlag = asyncHandler(async (req, res) => {
  try {
    const { id, serviceId } = req.body;

    if (!id || !serviceId) {
      return res.status(400).json({ message: "id and serviceId are required" });
    }

    const flag = await prisma.flagRecord.findUnique({ where: { id } });
    if (!flag) {
      return res.status(404).json({ message: "Flag not found" });
    }

    await prisma.flagRecord.delete({ where: { id } });

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await prisma.service.update({
      where: { id: serviceId },
      data: { hide: false },
    });

    return res.status(200).json({ message: "Flag dismissed successfully" });
  } catch (err) {
    console.error("dismissFlag error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const dismissUserFlag = asyncHandler(async (req, res) => {
  try {
    const { id, userId } = req.body;

    if (!id || !userId) {
      return res.status(400).json({ message: "id and userId are required" });
    }

    const flag = await prisma.flagRecord.findUnique({ where: { id } });
    if (!flag) {
      return res.status(404).json({ message: "Flag not found" });
    }

    await prisma.flagRecord.delete({ where: { id } });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { ban: false },
    });

    return res.status(200).json({ message: "Flag dismissed successfully" });
  } catch (err) {
    console.error("dismissFlag error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const getAuditLogs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: parseInt(limit),
  });

  // Format time
  const formattedLogs = logs.map((log) => {
    const now = new Date();
    const diff = now - new Date(log.createdAt);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    let time;
    if (days === 0) {
      const hours = new Date(log.createdAt).getHours();
      const minutes = new Date(log.createdAt).getMinutes();
      time = `Today, ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    } else if (days === 1) {
      const hours = new Date(log.createdAt).getHours();
      const minutes = new Date(log.createdAt).getMinutes();
      time = `Yesterday, ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    } else {
      time = new Date(log.createdAt).toLocaleDateString();
    }

    return { ...log, time };
  });

  res.status(200).json({ data: formattedLogs });
});
