import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/Users.js";

const router = express.Router();

// Registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashed });

    await newUser.save();
    res.status(201).send("User Registered");
  } catch (err) {
    console.error(err);
    res.status(500).send("Registration failed");
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not Found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid Credentials");

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } 
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Login failed");
  }
});

export default router;
