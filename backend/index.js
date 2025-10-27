const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { connectDB } = require("./src/config/database");
const mainRoutes = require("./src/modules/index.routes");
const errorHandler = require("./src/middleware/errorHandler");

// Load environment variables once at the entry point
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Main routing points
app.use("/api", mainRoutes);

// Basic error handling;
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
