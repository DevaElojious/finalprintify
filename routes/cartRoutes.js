import express from "express";
   import {
       addToCart,
       getCart,
       removeFromCart,
       clearCart,
       syncCart
   } from "../controllers/cartController.js";
   import { requireSignIn } from "../middlewares/authMiddleware.js";
   const router = express.Router();
   
   router.post("/add", requireSignIn, addToCart);
   router.post("/sync", requireSignIn, syncCart);
   router.get("/get", requireSignIn, getCart);
   router.post("/remove", requireSignIn, removeFromCart);
   router.delete("/clear", requireSignIn, clearCart);
   
   export default router;