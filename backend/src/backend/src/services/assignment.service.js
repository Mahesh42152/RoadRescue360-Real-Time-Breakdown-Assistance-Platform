const pool = require("../config/db");

// Haversine distance formula
function distance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function findNearestTechnician(lat, lng) {
  const result = await pool.query(
    "SELECT id, latitude, longitude FROM technicians WHERE available=true"
  );

  let nearest = null;
  let minDistance = Infinity;

  for (const tech of result.rows) {
    const d = distance(lat, lng, tech.latitude, tech.longitude);
    if (d < minDistance) {
      minDistance = d;
      nearest = tech;
    }
  }

  return nearest;
}

module.exports = { findNearestTechnician };
