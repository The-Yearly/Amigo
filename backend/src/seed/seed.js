import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding started...");

    // 🧹 CLEAR DATABASE
    await prisma.message.deleteMany();
    await prisma.review.deleteMany();
    await prisma.serviceRequest.deleteMany();
    await prisma.service.deleteMany();
    await prisma.admin.deleteMany();
    await prisma.user.deleteMany();

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash("password123", 10);

    // 👤 USERS
    const swayam = await prisma.user.create({
        data: {
            name: "Swayam Agrahari",
            email: "am.sc.u4cse23073@am.students.amrita.edu",
            password: hashedPassword,
            bio: "",
            department: "CSE",
            year: "3",
            rating: 4.9,
            isEmailVerified: true,
            profileImage:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        },
    });

    const rahul = await prisma.user.create({
        data: {
            name: "Rahul Sharma",
            email: "am.sc.u4cse23074@am.students.amrita.edu",
            password: hashedPassword,
            bio: "",
            department: "ECE",
            year: "2",
            rating: 4.5,
            isEmailVerified: true,
            profileImage:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        },
    });

    const priya = await prisma.user.create({
        data: {
            name: "Priya Nair",
            email: "priya@test.com",
            password: hashedPassword,
            bio: "",
            department: "CSE",
            year: "4",
            rating: 4.8,
            isEmailVerified: true,
            profileImage:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        },
    });

    // 👑 ADMIN
    await prisma.admin.create({
        data: {
            userId: swayam.id,
            isSuperAdmin: true,
            canAdd: true,
            canKick: true,
            canOverride: true,
            
        },
    });

    // 🧑‍💼 SERVICES
    const notePrinting = await prisma.service.create({
        data: {
            title: "Print Notes",
            description:
                "I will print high-quality notes and assignments for you.",
            category: "Errands",
            price: 50,
            image:
                "https://images.unsplash.com/photo-1586281380349-632531db7ed4",
            location: "Campus",
            estimatedTime: "2 hours",
            creatorId: swayam.id,
        },
    });

    const tutoring = await prisma.service.create({
        data: {
            title: "Math Tutoring",
            description:
                "Helping with calculus, algebra, assignments, and exam prep.",
            category: "Academics",
            price: 200,
            image:
                "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
            location: "Online",
            estimatedTime: "1 hour",
            creatorId: rahul.id,
        },
    });

    const uiux = await prisma.service.create({
        data: {
            title: "UI/UX Design Help",
            description:
                "Modern and aesthetic app and website UI designs.",
            category: "Design",
            price: 500,
            image:
                "https://images.unsplash.com/photo-1586717799252-bd134ad00e26",
            location: "Remote",
            estimatedTime: "2 days",
            creatorId: priya.id,
        },
    });

    // 📦 REQUESTS

    // COMPLETED REQUEST
    const request1 = await prisma.serviceRequest.create({
        data: {
            status: "Completed",
            serviceId: notePrinting.id,
            requesterId: priya.id,
            providerId: swayam.id,
        },
    });

    // ACCEPTED REQUEST
    const request2 = await prisma.serviceRequest.create({
        data: {
            status: "Accepted",
            serviceId: tutoring.id,
            requesterId: swayam.id,
            providerId: rahul.id,
        },
    });

    // PENDING REQUEST
    const request3 = await prisma.serviceRequest.create({
        data: {
            status: "Pending",
            serviceId: uiux.id,
            requesterId: rahul.id,
            providerId: priya.id,
        },
    });

    // IN PROGRESS REQUEST
    const request4 = await prisma.serviceRequest.create({
        data: {
            status: "InProgress",
            serviceId: uiux.id,
            requesterId: swayam.id,
            providerId: priya.id,
        },
    });

    // 💬 MESSAGES

    await prisma.message.createMany({
        data: [
            {
                content: "Hey, can you print my notes?",
                serviceRequestId: request1.id,
                senderId: priya.id,
                receiverId: swayam.id,
            },
            {
                content: "Sure! Send me the PDF.",
                serviceRequestId: request1.id,
                senderId: swayam.id,
                receiverId: priya.id,
            },
            {
                content: "Can we schedule tutoring tomorrow?",
                serviceRequestId: request2.id,
                senderId: swayam.id,
                receiverId: rahul.id,
            },
            {
                content: "Yep, 7 PM works.",
                serviceRequestId: request2.id,
                senderId: rahul.id,
                receiverId: swayam.id,
            },
            {
                content: "I need a mobile app UI design.",
                serviceRequestId: request4.id,
                senderId: swayam.id,
                receiverId: priya.id,
            },
            {
                content: "I'll share some drafts tonight.",
                serviceRequestId: request4.id,
                senderId: priya.id,
                receiverId: swayam.id,
            },
        ],
    });

    // ⭐ REVIEWS

    await prisma.review.create({
        data: {
            rating: 5,
            comment: "Super fast and reliable!",
            serviceRequestId: request1.id,
            reviewerId: priya.id,
            providerId: swayam.id,
        },
    });

    console.log("✅ Rich seed completed!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
