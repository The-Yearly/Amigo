import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const sendMessage = asyncHandler(async (req, res) => {
    const { serviceRequestId, content } = req.body;

    const request = await prisma.serviceRequest.findUnique({
        where: { id: serviceRequestId },
    });

    if (!request) {
        return res.status(404).json({ message: "Request not found" });
    }

    // determine receiver
    const receiverId =
        req.user === request.requesterId
            ? request.providerId
            : request.requesterId;

    const message = await prisma.message.create({
        data: {
            content,
            serviceRequestId,
            senderId: req.user,
            receiverId,
        },
    });

    res.status(201).json(message);
});

export const getMessages = asyncHandler(async (req, res) => {
    const { serviceRequestId } = req.params;

    const messages = await prisma.message.findMany({
        where: { serviceRequestId },
        orderBy: { createdAt: "asc" },
        // Ensure senderId is included in the selection
        select: {
            id: true,
            content: true,
            senderId: true,
            createdAt: true,
        }
    });

    res.json(messages);
});


export const getConversations = asyncHandler(async (req, res) => {
    const requests = await prisma.serviceRequest.findMany({
        where: {
            OR: [{ requesterId: req.user }, { providerId: req.user }],
            status: { in: ["Accepted", "InProgress"] },
        },
        include: {
            service: true,
            requester: true,
            provider: true,
            messages: {
                orderBy: { createdAt: 'desc' },
            }
        },
    });

    const formatted = requests.map((r) => {
        const isRequester = req.user === r.requesterId;

        const hasUnread = r.messages.some(
            (m) => m.receiverId === req.user && !m.isRead
        );

        return {
            id: r.id,
            title: r.service.title,
            otherUser: isRequester ? r.provider.name : r.requester.name,
            avatarSrc: isRequester ? r.provider.profileImage : r.requester.profileImage,
            isPending: hasUnread, // Trigger the "NEW" badge if there are unread messages
            preview: r.messages[0]?.content || "Start a conversation",
            time: r.messages[0] ? new Date(r.messages[0].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""
        };
    });

    res.json(formatted);
});

export const markAsRead = asyncHandler(async (req, res) => {
    const { serviceRequestId } = req.params;

    await prisma.message.updateMany({
        where: {
            serviceRequestId,
            receiverId: req.user,
            isRead: false
        },
        data: {
            isRead: true
        }
    });

    res.json({ message: "Messages marked as read" });
});