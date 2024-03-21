import { Request, Response } from "express";
import { getDB } from "../db.js"; // Import the getDB function from db.ts

const UserController = {
  getAllUsers: async (req: Request, res: Response): Promise<void> => {
    try {
      const db = getDB();
      const users = await db.collection("users").find().toArray();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getUserById: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const db = getDB();
      const user = await db.collection("users").findOne({ id: id });
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email } = req.body;
      const db = getDB();
      const result = await db.collection("users").insertOne({ name, email });
      res.status(201);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const db = getDB();
      const result = await db
        .collection("users")
        .updateOne({ id: id }, { $set: { name, email } });
      if (result.modifiedCount === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const db = getDB();
      const result = await db.collection("users").deleteOne({ id: id });
      if (result.deletedCount === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default UserController;
