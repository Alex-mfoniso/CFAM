// import express from 'express';

// import { login,logout,refreshToken,signup } from '../controllers/auth.controller.js';

// const router = express.Router();

// router.post("/signup", signup)

// router.post("/login", login)

// router.post("/logout", logout)

// router.post("/refresh-token", refreshToken)

// export default router

import express from "express";
import supabase from "../lib/supabase.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {
  login,
  logout,
  refreshToken,
  signup,
  stupid,
  delUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Middleware to set CORS headers
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

router.post("/signup", signup);
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Invalid user data received" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token (if using JWT)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/login", stupid);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.delete("/delete", delUser);
export default router;
