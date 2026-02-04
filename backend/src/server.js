require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const authRoutes = require("./routes/auth.routes");
const breakdownRoutes = require("./routes/breakdown.routes");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/breakdowns", breakdownRoutes);

io.on("connection", socket => {
  console.log("Client connected:", socket.id);

  socket.on("locationUpdate", data => {
    socket.broadcast.emit("liveLocation", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => {
  console.log("Backend running on port 5000");
});
