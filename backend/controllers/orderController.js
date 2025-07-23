import orderModel from "../model/orderModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
import userModel from "./../model/userModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
  const frontend_url = "https://annadata-0yly.onrender.com/";

  try {
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(req.body.userId, { cardData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Delivery Charges (optional)
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200, // ₹2 in paise
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Order placement failed" });
  }
};

export const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//user order for frontend
export const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId }); // ✅ use req.userId from middleware
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

//listing orders for admin panel
export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

//update order status
export const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "status updates" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
