import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Middleware to protect routes
export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "No token provided or token is malformed",
      });
    }

    const token = authHeader.split(" ")[1]; // Get token after "Bearer "

    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Middleware to check admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized Access: Admins only",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("ADMIN MIDDLEWARE ERROR:", error.message);
    return res.status(500).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
