const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "fahadzakir",
  host: "localhost",
  database: "pointsdb",
  password: "fahad1",
  port: 5432,
});

// Get all points
app.get("/points", async (req, res) => {
  const result = await pool.query("SELECT * FROM point ORDER BY name");
  res.json(result.rows);
});

// Get a single point by id
app.get("/points/:id", async (req, res) => {
  const result = await pool.query("SELECT * FROM point WHERE id = $1", [
    req.params.id,
  ]);
  res.json(result.rows[0]);
});

// Create a new point
app.post("/points", async (req, res) => {
  const { name, x, y } = req.body;
  const result = await pool.query(
    "INSERT INTO point (name, x, y) VALUES ($1, $2, $3) RETURNING *",
    [name, x, y]
  );
  res.json(result.rows[0]);
});

// Update a point
app.put("/points/:id", async (req, res) => {
  const { name, x, y } = req.body;
  const result = await pool.query(
    "UPDATE point SET name = $1, x = $2, y = $3 WHERE id = $4 RETURNING *",
    [name, x, y, req.params.id]
  );
  res.json(result.rows[0]);
});

// Delete a point
app.delete("/points/:id", async (req, res) => {
  await pool.query("DELETE FROM point WHERE id = $1", [req.params.id]);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
