import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { corsOptions } from "./config/cors.js";
import serviceRoutes from "./routes/service.routes.js";
import requestRoutes from "./routes/request.routes.js";
import authRoutes from "./routes/auth.routes.js"
dotenv.config();

const app = express();

// middleware
app.use(cors(corsOptions));
app.use(express.json());

// routes
app.use("/api/services", serviceRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/auth", authRoutes);



// health check
app.get("/", (req, res) => {
    res.send("Amigo API running 🚀");
});

// error handler (last)
import { errorHandler } from "./middleware/error.middleware.js";
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});