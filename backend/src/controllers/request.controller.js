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
      requesterId: req.user.uid,
      providerId: service.creatorId,
      status: "Pending",
    },
  });

  res.status(201).json(request);
});

export const getMyRequests = asyncHandler(async (req, res) => {
  const requests = await prisma.serviceRequest.findMany({
    where: {
      requesterId: req.user.uid,
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
    service: r.service.id,
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

export const getProviderRequests = asyncHandler(async (req, res) => {


  const requests = await prisma.serviceRequest.findMany({
    where: {
      providerId: req.user.uid.uid,
    },
    include: {
      service: true,
      requester: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatted = requests.map((r) => ({
    id: r.id,
    serviceId: r.serviceId,
    serviceTitle: r.service.title,
    requesterName: r.requester.name,
    requesterId: r.requester.id,
    status: r.status,
    price: `₹${r.service.price}`,
    date: r.createdAt,
  }));

  res.json(formatted);
});


export const newRequest = asyncHandler(async (req, res) => {
  const data = req.body;
  const service = await prisma.service.findUnique({
    where: { id: data.serviceId },
  });

  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  const existingRequest = await prisma.serviceRequest.findFirst({
    where: {
      serviceId: data.serviceId,
      requesterId: data.requesterId,
      providerId: data.providerId,
      status: "Pending",
    },
  });

  if (existingRequest) {
    return res.status(201).json({ message: "You already have a pending request for this service." });
  }
  const resp = await prisma.serviceRequest.create({
    data: {
      status: "Pending",
      service: {
        connect: { id: data.serviceId }
      },
      requester: {
        connect: { id: data.requesterId }
      },
      provider: {
        connect: { id: data.providerId }
      }
    }
  });
  res.json({ message: "Requested For Service" });
});



export const getIncomingRequests = asyncHandler(async (req, res) => {
  const { status, search } = req.query;

  const where = {
    providerId: req.user.uid,
  };

  if (status && status !== "All") {
    where.status = status;
  }

  const requests = await prisma.serviceRequest.findMany({
    where,
    include: {
      service: true,
      requester: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  let filtered = requests;

  if (search) {
    filtered = requests.filter((r) =>
      r.service.title.toLowerCase().includes(search.toLowerCase()) ||
      r.requester.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json(filtered);
});


export const getRequestDetail = asyncHandler(async (req, res) => {
  const request = await prisma.serviceRequest.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      service: true,
      requester: true,
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        take: 5,
      },
    },
  });

  if (!request) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  res.json(request);
});


const updateStatus = async (id, status) => {
  return prisma.serviceRequest.update({
    where: { id },
    data: { status },
  });
};


export const acceptRequest = asyncHandler(async (req, res) => {
  const updated = await updateStatus(req.params.id, "Accepted");
  res.json(updated);
});


export const rejectRequest = asyncHandler(async (req, res) => {
  const updated = await updateStatus(req.params.id, "Cancelled");
  res.json(updated);
});

export const startRequest = asyncHandler(async (req, res) => {
  const updated = await updateStatus(req.params.id, "InProgress");
  res.json(updated);
});


export const completeRequest = asyncHandler(async (req, res) => {
  const updated = await updateStatus(req.params.id, "Completed");
  res.json(updated);
});


export const getProviderStats = asyncHandler(async (req, res) => {
  const requests = await prisma.serviceRequest.findMany({
    where: {
      providerId: req.user.uid,
    },
  });

  const services = await prisma.service.count({
    where: {
      creatorId: req.user.uid,
    },
  });

  res.json({
    pending: requests.filter(r => r.status === "Pending").length,
    accepted: requests.filter(r => r.status === "Accepted").length,
    completed: requests.filter(r => r.status === "Completed").length,
    activeServices: services,
  });
});