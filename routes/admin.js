// routes/admin.js
import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";
import Room from "../model/Rooms.js";

const router = express.Router();

// Get all rooms
router.get("/rooms", verifyToken, isAdmin, async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

// Add new room
router.post("/rooms", verifyToken, isAdmin, async (req, res) => {
  const room = new Room(req.body);
  await room.save();
  res.status(201).json(room);
});

// Delete room
router.delete("/rooms/:id", verifyToken, isAdmin, async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.json({ message: "Room deleted" });
});

export default router;
