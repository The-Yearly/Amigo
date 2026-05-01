import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding started...");

    // 🧹 Clear DB (order matters)
    await prisma.message.deleteMany();
    await prisma.review.deleteMany();
    await prisma.serviceRequest.deleteMany();
    await prisma.service.deleteMany();
    await prisma.user.deleteMany();

    // 👤 USERS
    await prisma.user.createMany({
        data: [
            {
                name: "Swayam",
                email: "swayam@test.com",
                password: "hashedpassword",
                department: "CSE",
                year: "3",
                profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
            },
            {
                name: "Rahul",
                email: "rahul@test.com",
                password: "hashedpassword",
                department: "ECE",
                year: "2",
                profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
            },
            {
                name: "Priya",
                email: "priya@test.com",
                password: "hashedpassword",
                department: "CSE",
                year: "4",
                profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
            },
        ],
    });

    const users = await prisma.user.findMany();
    const [swayam, rahul, priya] = users;

    // 🧑‍💼 SERVICES (with REAL images)
    const service1 = await prisma.service.create({
        data: {
            title: "Print Notes",
            description: "I will print high-quality notes for your classes.",
            category: "Errands",
            price: 50,
            image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4",
            location: "Campus",
            estimatedTime: "2 hours",
            creatorId: swayam.id,
        },
    });

    const service2 = await prisma.service.create({
        data: {
            title: "Math Tutoring",
            description: "Get help with calculus, algebra, and exams.",
            category: "Academics",
            price: 200,
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
            location: "Online",
            estimatedTime: "1 hour",
            creatorId: rahul.id,
        },
    });

    const service3 = await prisma.service.create({
        data: {
            title: "UI/UX Design Help",
            description: "I will design modern and clean app interfaces.",
            category: "Design",
            price: 500,
            image: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26",
            location: "Remote",
            estimatedTime: "2 days",
            creatorId: priya.id,
        },
    });

    // 📦 SERVICE REQUEST
    const request1 = await prisma.serviceRequest.create({
        data: {
            status: "Completed",
            serviceId: service1.id,
            requesterId: priya.id,
            providerId: swayam.id,
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
                content: "Sure, send me the files!",
                serviceRequestId: request1.id,
                senderId: swayam.id,
                receiverId: priya.id,
            },
        ],
    });

    // ⭐ REVIEW
    await prisma.review.create({
        data: {
            rating: 5,
            comment: "Super fast and reliable service!",
            serviceRequestId: request1.id,
            reviewerId: priya.id,
            providerId: swayam.id,
        },
    });

    console.log("✅ Seeding completed with images!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });