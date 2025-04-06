import express from "express";
import { createOrderFromCartController } from "../controllers/orderController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create order from cart after form fill
router.post("/from-cart", requireSignIn, createOrderFromCartController);

export default router;
