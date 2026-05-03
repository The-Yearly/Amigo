import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../lib/sendMail.js";
const generateEncodedToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return Buffer.from(token).toString("base64");
};

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);}
export const signup = asyncHandler(async (req, res) => {
    const { userData } = req.body;
    const existingUser = await prisma.user.findUnique({
        where: { email: userData.mail },
    });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const otp = getRandomInt(100000, 999999).toString();
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const verificationToken = jwt.sign(
        { 
            userData: {
                name: userData.name,
                email: userData.mail,
                password: hashedPassword,
                department: userData.department || null,
                year: userData.year || null,
            },
            otp 
        },
        process.env.JWT_SECRET,
        { expiresIn: "10m" }
    );

    await sendEmail(
        userData.mail,
        "Verify Your Account",
        `Your verification code is: <b>${otp}</b>. It expires in 10 minutes.`
    ).catch(console.error);

    res.status(200).json({
        message: "OTP sent to email. Please verify to complete registration.",
        verificationToken,
    });
});
export const verifyOtp = asyncHandler(async (req, res) => {
    const { otp, verificationToken } = req.body;

    if (!otp || !verificationToken) {
        return res.status(400).json({ message: "OTP and token are required" });
    }

    try {
        const decoded = jwt.verify(verificationToken, process.env.JWT_SECRET);

        if (decoded.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP code" });
        }
        const { name, email, password, department, year } = decoded.userData;
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                department,
                year,
                isEmailVerified: true,
            },
        });

        const sessionToken = generateEncodedToken(user.id);
        const { password: _, ...safeUser } = user;

        res.status(201).json({
            message: "Account created and verified successfully!",
            user: safeUser,
            token: sessionToken,
        });

    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Session expired. Please sign up again." });
    }
});




export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        return res.status(401).json({ message: "User Not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const encodedToken = generateEncodedToken(user.id);
    const { password: _, ...safeUser } = user;
    res.status(200).json({
        message: "Login successful",
        user: safeUser,
        token: encodedToken,
    });
});