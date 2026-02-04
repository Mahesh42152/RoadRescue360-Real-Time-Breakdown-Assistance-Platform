const express = require("express");
const pool = require("../config/db");

const router = express.Router();

router.post("/", async (req, res) => {
  const { user_id, issue, latitude, longitude } = req.body;

  const result = await pool.query(
    `INSERT INTO breakdowns(user_id, issue, latitude, longitude, status)
     VALUES($1,$2,$3,$4,'OPEN') RETURNING *`,
    [user_id, issue, latitude, longitude]
  );

  res.json(result.rows[0]);
});

router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM breakdowns");
  res.json(result.rows);
});

module.exports = router;
