import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getDashboard = asyncHandler(async (req, res) => {
  const userId = req.user.uid;
  console.log(userId,"Story")
  console.log("Fetching dashboard for user:", userId);

  const [services, requests, messages] = await Promise.all([
    prisma.service.count({
      where: { creatorId: userId },
    }),

    prisma.serviceRequest.count({
      where: {
        OR: [{ requesterId: userId }, { providerId: userId }],
        status: {
          in: ["Pending", "Accepted", "InProgress"],
        },
      },
    }),

    prisma.message.count({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
    }),
  ]);

  res.json({
    services,
    activeRequests: requests,
    messages,
  });
});

export const getDashboardStats = asyncHandler(async (req, res) => {
  const userId = req.user.uid;
  console.log("Fetching dashboard stats for user:", userId);

  const [gigs, earnings] = await Promise.all([
    prisma.service.count({
      where: { creatorId: userId },
    }),

    prisma.serviceRequest.findMany({
      where: {
        service: {
          creatorId: userId,
        },
        status: "Completed",
      },
      select: {
        service: {
          select: {
            price: true,
          },
        },
      },
    }),
  ]);

  const totalEarnings = earnings.reduce(
    (sum, r) => sum + (r.service.price || 0),
    0,
  );
  res.json({
    gigs,
    earnings: totalEarnings,
  });
});
