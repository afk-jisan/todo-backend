const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail, invalidateUser } = require("../models/userModel");

const SECRET_KEY = process.env.JWT_SECRET;
const tokenBlacklist = new Set(); // Store invalidated tokens


// Register a new user
async function register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(name, email, hashedPassword);

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//Login user and return JWT token
async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ token, message: "Login successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Logout - Invalidate token by storing it in the database
async function logout(req, res) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(400).json({ message: "No token provided" });
    }
    
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const expiry = new Date(decoded.exp * 1000);

        await invalidateUser(token, expiry);

        res.json({ message: "Logout successful, token invalidated" });
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = { register, login, logout };
