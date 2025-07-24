import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  isAvailable: { type: Boolean, default: true },
});

const Room = mongoose.model("Room",roomSchema)
export default Room
