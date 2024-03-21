import { Request, Response } from "express";
import { getDB } from "../db.js"; // Import the getDB function from db.ts

const ProjectController = {
  getAllProjects: async (req: Request, res: Response): Promise<void> => {
    try {
      const db = getDB();
      const projects = await db.collection("projects").find().toArray();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getProjectById: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const db = getDB();
      const project = await db.collection("projects").findOne({ id: id });
      if (!project) {
        res.status(404).json({ error: "Project not found" });
        return;
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createProject: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, description } = req.body;
      const db = getDB();
      const result = await db
        .collection("projects")
        .insertOne({ name, description });
      res.status(201);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateProject: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const db = getDB();
      const result = await db
        .collection("projects")
        .updateOne({ id: id }, { $set: { name, description } });
      if (result.modifiedCount === 0) {
        res.status(404).json({ error: "Project not found" });
        return;
      }
      res.json({ message: "Project updated successfully" });
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteProject: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const db = getDB();
      const result = await db.collection("projects").deleteOne({ id: id });
      if (result.deletedCount === 0) {
        res.status(404).json({ error: "Project not found" });
        return;
      }
      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default ProjectController;
