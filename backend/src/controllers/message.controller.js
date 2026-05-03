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
    });

    res.json(messages);
});


export const getConversations = asyncHandler(async (req, res) => {
    const requests = await prisma.serviceRequest.findMany({
        where: {
            OR: [
                { requesterId: req.user },
                { providerId: req.user },
            ],
            status: {
                in: ["Accepted", "InProgress"],
            },
        },
        include: {
            service: true,
            requester: true,
            provider: true,
        },
    });

    const formatted = requests.map((r) => ({
        id: r.id,
        title: r.service.title,
        otherUser:
            req.user === r.requesterId
                ? r.provider.name
                : r.requester.name,
    }));

    res.json(formatted);
});