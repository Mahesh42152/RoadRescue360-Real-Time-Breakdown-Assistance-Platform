CREATE TABLE technicians (
  id SERIAL PRIMARY KEY,
  name TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  available BOOLEAN DEFAULT true
);

ALTER TABLE breakdowns
ADD COLUMN technician_id INTEGER;
