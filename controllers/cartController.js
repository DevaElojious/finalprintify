import Cart from "../models/cartModel.js";
   import Product from "../models/productModel.js";
   import mongoose from "mongoose";
   
   export const addToCart = async (req, res) => {
       try {
           const { _id: productId } = req.body; // Expect _id from client
           const userId = req.user._id;
   
           // Validate productId (_id)
           if (!mongoose.isValidObjectId(productId)) {
               return res.status(400).send({ success: false, message: "Invalid product ID" });
           }
   
           // Find the product by _id
           const product = await Product.findById(productId);
           if (!product) {
               return res.status(404).send({ success: false, message: "Product not found" });
           }
   
           let cart = await Cart.findOne({ user: userId });
           if (!cart) {
               cart = new Cart({
                   user: userId,
                   products: [{
                       product: productId,
                       name: product.name,
                       price: product.price,
                       description: product.description,
                       photo: product.photo,
                       quantity: 1
                   }],
               });
           } else {
               const existingIndex = cart.products.findIndex((p) => p.product.toString() === productId);
               if (existingIndex !== -1) {
                   cart.products[existingIndex].quantity += 1;
               } else {
                   cart.products.push({
                       product: productId,
                       name: product.name,
                       price: product.price,
                       description: product.description,
                       photo: product.photo,
                       quantity: 1
                   });
               }
           }
           await cart.save();
           res.status(200).send({ success: true, cart });
       } catch (error) {
           console.error("Add to cart error:", error);
           res.status(500).send({ success: false, error: "Failed to add to cart" });
       }
   };
   
   export const syncCart = async (req, res) => {
       try {
           const userId = req.user._id;
           const { products } = req.body; // Expect an array of product _ids
   
           let cart = await Cart.findOne({ user: userId });
           if (!cart) {
               cart = new Cart({
                   user: userId,
                   products: [],
               });
           }
   
           cart.products = [];
   
           for (const clientProduct of products) {
               // Validate _id
               if (!mongoose.isValidObjectId(clientProduct._id)) {
                   console.warn("Invalid product _id in sync:", clientProduct._id);
                   continue;
               }
   
               const product = await Product.findById(clientProduct._id);
               if (product) {
                   cart.products.push({
                       product: clientProduct._id,
                       name: product.name,
                       price: product.price,
                       description: product.description,
                       photo: product.photo,
                       quantity: 1,
                   });
               } else {
                   console.warn("Product not found during sync:", clientProduct._id);
               }
           }
   
           await cart.save();
           res.status(200).send({ success: true, cart });
       } catch (error) {
           console.error("Sync cart error:", error);
           res.status(500).send({ success: false, error: "Failed to sync cart" });
       }
   };
   
   export const getCart = async (req, res) => {
       try {
           const userId = req.user._id;
           const cart = await Cart.findOne({ user: userId }).populate('products.product', '_id name price description photo');
           res.status(200).send({ success: true, cart });
       } catch (error) {
           res.status(500).send({ success: false, error: "Failed to get cart" });
       }
   };
   
   export const removeFromCart = async (req, res) => {
       try {
           const userId = req.user._id;
           const { _id: productId } = req.body; // Expect _id
           if (!mongoose.isValidObjectId(productId)) {
               return res.status(400).send({ success: false, message: "Invalid product ID" });
           }
           const cart = await Cart.findOne({ user: userId });
           if (cart) {
               cart.products = cart.products.filter((item) => item.product.toString() !== productId);
               await cart.save();
           }
           res.status(200).send({ success: true, cart });
       } catch (error) {
           res.status(500).send({ success: false, error: "Failed to remove item" });
       }
   };
   
   export const clearCart = async (req, res) => {
       try {
           const userId = req.user._id;
           await Cart.findOneAndDelete({ user: userId });
           res.status(200).send({ success: true });
       } catch (error) {
           res.status(500).send({ success: false, error: "Failed to clear cart" });
       }
   };