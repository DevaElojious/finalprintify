import express from "express";
import { chatbotController } from "../controllers/openaiController.js"; // Add .js extension

const router = express.Router();

// Route
router.post("/chatbot", chatbotController);

export default router;
