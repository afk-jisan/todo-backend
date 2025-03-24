const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token from "Bearer <token>"
    if (!token) return res.status(401).json({ error: "Access denied, no token provided" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(403).json({ error: "Invalid or expired token" });
    }
}

module.exports = authMiddleware;
