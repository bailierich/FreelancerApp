import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/UserRoutes.js"; // Import user routes
import projectRoutes from "./routes/ProjectRoutes.js"; // Import project routes
import { connectDB } from "./db.js";
dotenv.config();
const app = express();
// Middleware
app.use(express.json());
// Routes
app.use("/api/users", userRoutes); // Use user routes
app.use("/api/projects", projectRoutes); // Use project routes
connectDB()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
