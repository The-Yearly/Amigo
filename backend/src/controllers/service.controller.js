import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// GET ALL SERVICES
export const getServices = asyncHandler(async (req, res) => {
  const services = await prisma.service.findMany({
    where:{
      hide:false
    },
    include: {
      creator: true,
      requests: {
        include: {
          review: true,
        },
      },
    },
  });

  const formatted = services.map((s) => {
    const reviews = s.requests.map((r) => r.review).filter(Boolean);

    const rating =
      reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0;

    return {
      id: s.id,
      imageSrc: s.image || "https://via.placeholder.com/400",
      imageAlt: s.title,

      badge: rating >= 4.5 ? { label: "Top Rated" } : null,

      creatorImg: s.creator.profileImage || "https://via.placeholder.com/100",
      creatorName: s.creator.name,
      creatorRole: s.creator.department,

      title: s.title,
      rating,
      reviewCount: reviews.length,

      // format here so frontend stays dumb
      price: `₹${s.price}`,
    };
  });

  res.json(formatted);
});

// GET SINGLE SERVICE

export const getServiceById = asyncHandler(async (req, res) => {
  try {
    const service = await prisma.service.findUnique({
      where: { id: req.params.id },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            bio: true,
            rating: true,
            profileImage: true,
            department: true,
            year: true,
            email: true,
          },
        },
        requests: {
          include: {
            review: true, // pull reviews attached to each request
          },
        },
      },
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// CREATE SERVICE
export const createService = asyncHandler(async (req, res) => {
  const { title, description, category, price, image, location, id } = req.body;
  console.log(req.body);
  const service = await prisma.service.create({
    data: {
      title,
      description,
      category,
      price: Number(price),
      image,
      location,
      creatorId: id,
    },
  });

  res.status(201).json(service);
});

export const getMyServices = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.uid;
    console.log(req.user, "HEllo");
    const services = await prisma.service.findMany({
      where: {
        creatorId: userId,
      },
      include: {
        requests: true,
      },
    });
    console.log(services, userId, "S");
    const formatted = services.map((s) => ({
      id: s.id,
      imageSrc: s.image || "https://via.placeholder.com/400",
      imageAlt: s.title,
      status:
        s.requests.length === 0
          ? "Active"
          : s.requests.some((r) => r.status === "InProgress")
            ? "In Progress"
            : s.requests.some((r) => r.status === "Completed")
              ? "Completed"
              : "Active",

      title: s.title,
      price: `₹${s.price}`,
      description: s.description,

      stats: [
        {
          label: "Total Requests",
          value: `${s.requests.length}`,
        },
      ],
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching user's services:", error);
    res.status(500).json({ message: "Failed to fetch services" });
  }
});

export const editService = asyncHandler(async (req, res) => {
  const { title, description, category, price, image, location, eid, id } =
    req.body;
  const userId = req.user.uid;
  const service = await prisma.service.findFirst({
    where: {
      id: eid,
    },
  });
  if (!service) {
    return res.status(404).json({ message: "Post not found" });
  }
  console.log(service.creatorId, userId);
  if (service.creatorId !== userId) {
    res.status(403).json({
      message: "Access denied. You can only edit your own posts.",
    });
  }
  const updatedServce = await prisma.service.update({
    where: {
      id: eid,
    },
    data: {
      category: category,
      description: description,
      image: image,
      location: location,
      price: price,
      title: title,
    },
  });

  res.status(201).json(service);
});

export const deleteService = asyncHandler(async (req, res) => {
  const userId = req.user.uid;
  const eid=req.params.id
  console.log("ME Here",eid,userId)
  const service = await prisma.service.findFirst({
    where: {
      id: eid,
    },
  });
  if (!service) {
    return res.status(404).json({ message: "Post not found" });
  }
  if (service.creatorId !== userId) {
    res.status(403).json({
      message: "Access denied. You can only delete your own posts.",
    });
  }
  await prisma.service.delete({
    where: {
      id: eid,
    },
  });

  return res.status(200).json({
    message: "Service deleted successfully",
  });
});
