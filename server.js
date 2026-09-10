require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const menuRoutes = require("./routes/menu.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

// Connect to MongoDB
connectDB();

// Allow requests from frontend
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", menuRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Render gives us PORT through environment variables
const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});