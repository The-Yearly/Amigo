import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createFlag = asyncHandler(async (req, res) => {
  // The person clicking the button (from your auth middleware)
  const reporterId = req.user.uid;
  
  // Get data from request body
  const { reportedUserId, serviceId, reason } = req.body;

  // Validate that at least one target is provided
  if (!reportedUserId && !serviceId) {
    return res.status(400).json({ 
      message: "Either reportedUserId or serviceId must be provided" 
    });
  }

  // Determine flag type based on what's being reported
  const flagType = reportedUserId ? "USER" : "ERRAND";

  // If reporting a user, verify they exist
  if (reportedUserId) {
    const targetUser = await prisma.user.findUnique({
      where: { id: reportedUserId },
    });

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if this user is already flagged
    const existingFlag = await prisma.flagRecord.findFirst({
      where: {
        type: "USER",
        userId: reportedUserId,
        status: "PENDING", // Only check for pending flags
      },
    });

    if (existingFlag) {
      return res.status(200).json({ message: "User already flagged" });
    }
  }

  // If reporting a service, verify it exists
  if (serviceId) {
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Check if this service is already flagged
    const existingFlag = await prisma.flagRecord.findFirst({
      where: {
        type: "ERRAND",
        serviceId: serviceId,
        status: "PENDING", // Only check for pending flags
      },
    });

    if (existingFlag) {
      return res.status(200).json({ message: "Service already flagged" });
    }
  }

  // Create the flag record
  const flagRecord = await prisma.flagRecord.create({
    data: {
      type: flagType,
      userId: reportedUserId || null,
      serviceId: serviceId || null,
      reason: reason || `Reported from ${flagType === "USER" ? "user profile" : "service page"}`,
      status: "PENDING",
    },
  });

  return res.status(201).json({ 
    message: `${flagType === "USER" ? "User" : "Service"} has been flagged successfully`,
    flagRecord 
  });
});