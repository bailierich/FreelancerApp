import express from "express";
import ProjectController from "../controllers/ProjectController.js";
const router = express.Router();
// Define routes
router.get("/projects", ProjectController.getAllProjects);
router.get("/projects/:id", ProjectController.getProjectById);
router.post("/projects", ProjectController.createProject);
router.put("/projects/:id", ProjectController.updateProject);
router.delete("/projects/:id", ProjectController.deleteProject);
export default router;
