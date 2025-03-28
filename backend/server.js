// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import authRoutes from "./routes/auth.routes.js";
// import { connectDB } from "./lib/db.js";

// dotenv.config();
// const app = express();

// const PORT = process.env.PORT || 5000;

// // Allowed origins for CORS
// const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true, // Allow cookies
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// // Apply CORS middleware
// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions)); // Handle preflight requests

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // Routes
// app.use("/api/auth", authRoutes);

// // Start the server
// app.listen(PORT, () => {
//   console.log("Server is running on http://localhost:" + PORT);
//   connectDB();
// });

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

// Enhanced CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    // "X-Requested-With",
    // "Accept",
  ],
  exposedHeaders: ["Set-Cookie"],
  optionsSuccessStatus: 200, // For legacy browser support
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

// Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

// Test endpoint
app.get("/api/test-cors", (req, res) => {
  res.json({ message: "CORS test successful" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
