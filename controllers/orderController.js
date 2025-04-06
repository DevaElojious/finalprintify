import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";

export const createOrderFromCartController = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user);
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate("products.product");
    console.log("CART FOUND:", JSON.stringify(cart, null, 2));

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const newOrder = new Order({
      user: userId,
      products: cart.products,
      paymentStatus: "Pending Confirmation",
    });

    await newOrder.save();

    cart.products = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Order created from cart",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order from cart:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
