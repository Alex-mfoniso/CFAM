// import express from 'express';

<<<<<<< HEAD
// import { login,logout,refreshToken,signup } from '../controllers/auth.controller.js';

// const router = express.Router();


// router.post("/signup", signup)

// router.post("/login", login)

// router.post("/logout", logout)

// router.post("/refresh-token", refreshToken)

// export default router


import express from 'express';
import { login, logout, refreshToken, signup, stupid, delUser } from '../controllers/auth.controller.js';


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
router.post("/login", login);
router.get("/login", stupid);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.delete("/delete", delUser )

export default router;

