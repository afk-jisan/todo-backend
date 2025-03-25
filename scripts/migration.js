const pool = require('../config/db');

async function runMigrations() {
  try {
    console.log("Running migrations...");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        is_completed BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);


    await pool.query(`
      CREATE TABLE IF NOT EXISTS blacklisted_tokens (
        id SERIAL PRIMARY KEY,
        token TEXT UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL
      );
    `);

    console.log("Migrations completed.");
    process.exit();
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}



// Execute Migration or table creation and then handle process exit
runMigrations()
  .then(() => pool.end())
  .then(() => process.exit(0))
  .catch(err => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });