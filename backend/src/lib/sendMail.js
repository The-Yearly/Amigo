import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAILID,
        pass: process.env.EMAILPASS,
    },
});

export async function sendEmail(
    to,
    subject,
    html,
){
    try {
        console.log("Sending Mial")
        await transporter.sendMail({
            from: `<${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
        console.log(`📧 Email sent to ${to}`);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}