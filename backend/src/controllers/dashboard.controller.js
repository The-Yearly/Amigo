import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getDashboard = asyncHandler(async (req, res) => {
  const userId = req.user.uid;

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
export const getRecentServices = asyncHandler(async (req, res) => {
  const userId = req.user.uid;

  const services = await prisma.service.findMany({
    where: { creatorId: userId },
    orderBy: { createdAt: "desc" },
    take: 2,
  });

  res.json(services);
});