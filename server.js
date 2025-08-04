const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connect to PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "customerdb",
  password: "your_password",
  port: 5432,
});

// List all customers with pagination
app.get("/api/customers", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const result = await pool.query(
      "SELECT * FROM customers ORDER BY id LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    const count = await pool.query("SELECT COUNT(*) FROM customers");

    res.json({
      data: result.rows,
      total: parseInt(count.rows[0].count),
      page,
      limit,
    });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Get customer by ID with order count
app.get("/api/customers/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid customer ID" });
  }

  try {
    const customer = await pool.query("SELECT * FROM customers WHERE id = $1", [id]);

    if (customer.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    const orderCount = await pool.query(
      "SELECT COUNT(*) FROM orders WHERE customer_id = $1",
      [id]
    );

    res.json({
      ...customer.rows[0],
      orderCount: parseInt(orderCount.rows[0].count),
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(Server running on http://localhost:${PORT});
});
