import express from "express";

import pg from "pg";

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const app = express();

app.use(express.json());

app.get("/api/tasks", async (req, res, next) => {
  const result = await db.query("SELECT * FROM tasks").catch(next);
  res.send(result.rows);
});

app.get("/api/tasks/:id", async (req, res, next) => {
  const result = await db
    .query("SELECT * FROM tasks WHERE id = $1", [req.params.id])
    .catch(next);

  if (result.rows.length === 0) {
    res.sendStatus(404);
  } else {
    res.send(result.rows[0]);
  }
});

app.post("/api/tasks", async (req, res, next) => {
  const { description } = req.body;

  const result = await db
    .query("INSERT INTO tasks(description) VALUES ($1)", [description])
    .catch(next);
  res.send(result.rows[0]);
});

app.delete("/api/tasks/:id", async (req, res, next) => {
  const { id } = req.params;

  await db.query("DELETE FROM tasks WHERE id = $1", [id]).catch(next);
  res.sendStatus(204);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

export default app;
