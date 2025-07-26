import express from "express";
const router = express.Router();
import Room from "../model/Rooms.js";

// GET SINGLE ROOM
router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).send("Room not found");
    res.json(room);
  } catch (err) {
    res.status(500).send("Error fetching room");
  }
});

// GET ALL ROOMS
router.get("/", async (req, res) => {
  const room = await Room.find({});
  res.json(room);
});

// ADD ROOM
router.post("/", async (req, res) => {
  const newRoom = new Room(req.body);
  newRoom.save();
  res.json(newRoom);
});

export default router;
