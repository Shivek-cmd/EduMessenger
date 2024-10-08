// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
