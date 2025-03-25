const pool = require('../config/db');

async function seedDatabase() {
  const client = await pool.connect();
  try {
    console.log("Starting database seeding...");
    
    await client.query('BEGIN');

    // Seed users table
    const userRes = await client.query(`
      INSERT INTO users (name, email, password) 
      VALUES 
        ('John Doe', 'johndoe@example.com', 'hashedpassword1'),
        ('Jane Smith', 'janesmith@example.com', 'hashedpassword2'),
        ('Admin User', 'admin@example.com', 'hashedpassword3')
      ON CONFLICT (email) DO NOTHING
      RETURNING id;
    `);

    console.log(`Inserted/attempted ${userRes.rowCount} users`);

    // Seed todos table
    const todoRes = await client.query(`
      INSERT INTO todos (user_id, title, description, is_completed) 
      VALUES
        (1, 'Buy groceries', 'Milk, eggs, bread', false),
        (1, 'Finish project', 'Complete the backend API', false),
        (2, 'Call mom', 'Wish her happy birthday', false),
        (3, 'Deploy app', 'Deploy to production server', true)
      ON CONFLICT DO NOTHING;
    `);

    console.log(`Inserted/attempted ${todoRes.rowCount} todos`);

    await client.query('COMMIT');
    console.log("Database seeded successfully!");
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Error seeding database:", err);
    throw err;
  } finally {
    client.release();
  }
}

// Execute seeding and then handle process exit
seedDatabase()
  .then(() => pool.end())
  .then(() => process.exit(0))
  .catch(err => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });