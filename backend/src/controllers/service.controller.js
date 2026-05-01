import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// GET ALL SERVICES
export const getServices = asyncHandler(async (req, res) => {
    const services = await prisma.service.findMany({
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
        const reviews = s.requests
            .map((r) => r.review)
            .filter(Boolean);

        const rating =
            reviews.length > 0
                ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
                : 0;

        return {
            id: s.id,
            imageSrc: s.image || "https://via.placeholder.com/400",
            imageAlt: s.title,

            badge:
                rating >= 4.5
                    ? { label: "Top Rated" }
                    : null,

            creatorImg:
                s.creator.profileImage || "https://via.placeholder.com/100",
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
    const { id } = req.params;

    const service = await prisma.service.findUnique({
        where: { id },
        include: {
            creator: true,
            requests: true,
        },
    });

    if (!service) {
        return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
});

// CREATE SERVICE
export const createService = asyncHandler(async (req, res) => {
    const { title, description, category, price, image, location } = req.body;

    const service = await prisma.service.create({
        data: {
            title,
            description,
            category,
            price: Number(price),
            image,
            location,
            creatorId: req.user,
        },
    });

    res.status(201).json(service);
});

export const getMyServices = asyncHandler(async (req, res) => {
    try {
        console.log("Fetching services for user:", req.user);
        console.log("Fetching services for user:", req.user);
        const services = await prisma.service.findMany({
            where: {
                creatorId: req.user,
            },
            include: {
                requests: true,
            },
        });

        const formatted = services.map((s) => ({
            id: s.id,
            imageSrc: s.image || "https://via.placeholder.com/400",
            imageAlt: s.title,
            status:
                s.requests.length === 0
                    ? "Active"
                    : s.requests.some(r => r.status === "InProgress")
                        ? "In Progress"
                        : s.requests.some(r => r.status === "Completed")
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