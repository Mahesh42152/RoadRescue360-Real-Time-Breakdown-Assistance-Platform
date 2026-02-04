const express = require("express");
const pool = require("../config/db");
const { findNearestTechnician } = require("../services/assignment.service");

const router = express.Router();

router.post("/", async (req, res) => {
  const { user_id, issue, latitude, longitude } = req.body;

  const technician = await findNearestTechnician(latitude, longitude);

  const result = await pool.query(
    `INSERT INTO breakdowns
     (user_id, issue, latitude, longitude, technician_id, status)
     VALUES ($1,$2,$3,$4,$5,'ASSIGNED')
     RETURNING *`,
    [user_id, issue, latitude, longitude, technician?.id]
  );

  res.json({
    breakdown: result.rows[0],
    assignedTechnician: technician
  });
});

module.exports = router;
