import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";


    

// CREATE REQUEST
export const createRequest = asyncHandler(async (req, res) => {
    const { serviceId } = req.body;

    const service = await prisma.service.findUnique({
        where: { id: serviceId },
    });

    if (!service) {
        return res.status(404).json({ message: "Service not found" });
    }

    const request = await prisma.serviceRequest.create({
        data: {
            serviceId,
            requesterId: req.user,
            providerId: service.creatorId,
            status: "Pending",
        },
    });

    res.status(201).json(request);
});


export const getMyRequests = asyncHandler(async (req, res) => {
    console.log("Fetching requests for user:", req.user);
    const requests = await prisma.serviceRequest.findMany({
        where: {
            requesterId: req.user,
        },
        include: {
            service: true,
            provider: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const formatted = requests.map((r) => ({
        id: r.id,
        imageSrc: r.service.image || "https://via.placeholder.com/400",
        imageAlt: r.service.title,
        status: r.status,
        title: r.service.title,
        provider: r.provider.name,
        date: r.createdAt,
        price: `₹${r.service.price}`,
    }));

    res.json(formatted);
});


export const updateRequestStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await prisma.serviceRequest.update({
        where: { id },
        data: { status },
    });

    res.json(updated);
});