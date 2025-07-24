import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 2000;
import authRoutes from "./routes/auth.js";
import roomRoutes from "./routes/rooms.js";
app.use(cors());
app.use(express.json());

// MONGO CONNECTION

mongoose
  .connect(process.env.MONGO_URI)
  .then(()=> console.log("DB Connected"))
  .catch((err)=> console.log("Error to Connect DB",err));

app.get("/", (req, res) => res.send("Home Page"));
app.use("/api/auth", authRoutes);
app.use("/api/room", roomRoutes);

app.listen(PORT, console.log(`Server is Running at PORT ${PORT}`));
