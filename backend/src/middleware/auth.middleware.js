import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    try {
        if (!req.cookies || !req.cookies.creds) {
            return res.status(401).json({ message: "No credentials found" });
        }
        const creds = JSON.parse(req.cookies.creds);
        console.log("Auth creds:", creds);

        if (!creds || !creds.token) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const rawToken = Buffer.from(creds.token, "base64").toString("utf-8");
        const decoded = jwt.verify(rawToken, process.env.JWT_SECRET);
        req.user = decoded.userId; // Attach user info to request

        console.log("Authenticated user:", req.user);


        next();
    } catch (err) {
        console.error("Auth error:", err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export const adminOnly = async (req, res, next) => {
    const admin = await prisma.admin.findUnique({
        where: { userId: req.user.id },
    });

    if (!admin) {
        return res.status(403).json({ message: "Admin access required" });
    }

    req.admin = admin;
    next();
};