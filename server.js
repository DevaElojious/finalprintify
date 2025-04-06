import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import colors from "colors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import openAiRoutes from "./routes/openAiRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from './routes/cartRoutes.js';

// Configure environment variables
dotenv.config();

// Database configuration
connectDB();

// Create Express application
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));

// Route setup
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/openai", openAiRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/orders", orderRoutes); 
app.use("/api/v1/cart", cartRoutes);

// Test API
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the app</h1>");
});

// Submit payment endpoint
app.post("/api/v1/orders/submit-payment", (req, res) => {
  res.status(200).send({ success: true, message: "Payment submitted successfully" });
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.bgCyan.white);
});
