import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/cors.js";
import serviceRoutes from "./routes/service.routes.js";
import requestRoutes from "./routes/request.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

import adminRoutes from "./routes/adminManager.routes.js";
import jwt from "jsonwebtoken";
import ImageKit from "imagekit";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();

// middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(cookieParser());
// routes
app.use("/api/services", serviceRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);

// health check
app.get("/", (req, res) => {
  res.send("Amigo API running 🚀");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.get("/api/me", (req, res) => {
  console.log("Rer", req.cookies.token);
  if (req.cookies.token) {
    const token = Buffer.from(req.cookies.token, "base64").toString("utf-8");
    console.log(token, "nla");
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log(decoded.userId);
      res.json({
        uid: decoded.userId.id,
        isAdmin: decoded.userId.isAdmin,
        isSuperAdmin: decoded.userId.isSuperAdmin || false,
        canAdd: decoded.userId.canAdd || false,
        canKick: decoded.userId.canKick || false,
        canOverride: decoded.userId.canOverride || false,
      });
    } catch (err) {
      console.log(err, "s");
      res.status(401).json({ message: "Invalid or expired session" });
    }
  } else {
    res.status(401).json({ message: "Invalid or expired session" });
  }
});

app.use("/api/uploadImage", (req, res) => {
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });
  const result = imagekit.getAuthenticationParameters();
  res.send({
    token: result.token,
    expire: result.expire,
    signature: result.signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
