import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  console.log("HJE", req.cookies)
  if (req.cookies.token) {
    const token = Buffer.from(req.cookies.token, "base64").toString("utf-8");
    console.log(token, "He");
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: "Invalid or expired session" });
    }
  } else {
    res.status(401).json({ message: "Invalid or expired session" });
  }
};

export const adminOnly = (req, res, next) => {
  console.log("")
  if (req.cookies.token) {
    console.log(req.cookies, "SAd")
    const token = Buffer.from(req.cookies.token, "base64").toString("utf-8");
    console.log(token, "He");
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded, "Baby");
      if (decoded.userId.isAdmin) {
        req.user = { id: decoded.userId.id, ...decoded.userId };
        next();
      }
    } catch (err) {
      res.status(401).json({ message: "Invalid or expired session" });
    }
  } else {
    res.status(401).json({ message: "Invalid or expired session" });
  }
};

