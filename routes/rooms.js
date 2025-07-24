import express from 'express'
const router = express.Router();
import Room from "../model/Rooms.js"


// GET ALL ROOMS
router.get("/", async (req, res) => {
    const room = await Room.find({})
    res.json(room)
});


// ADD ROOM
router.post('/', async(req,res)=>{
    const newRoom = new Room(req.body)
    newRoom.save()
    res.json(newRoom)
})

export default router
