const db = require("../config/db");

// Create a new user
async function createUser(name, email, hashedPassword) {
    return db.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, hashedPassword]
    );
}

// Find user by email
async function getUserByEmail(email) {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
}

// Find user by ID
async function findUserById(id) {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
}



// Function to store invalidated tokens in the database
async function invalidateUser(token, expiry) {
    try {
        await pool.query("INSERT INTO blacklisted_tokens (token, expires_at) VALUES ($1, $2)", [token, expiry]);
        return;
        // return result.rows[0];
    } catch (err) {
        console.error("Error invalidating token:", err);
        throw err;
    }
}



module.exports = { createUser, getUserByEmail, findUserById, invalidateUser };
