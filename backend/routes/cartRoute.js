import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

// GET cart
cartRouter.get("/get", authMiddleware, getCart);

// POST add to cart
cartRouter.post("/add", authMiddleware, addToCart);

// DELETE remove from cart using itemId in URL
cartRouter.delete("/remove/:itemId", authMiddleware, removeFromCart);

export default cartRouter;
