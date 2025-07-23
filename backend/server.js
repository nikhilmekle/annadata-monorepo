import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: [
      "https://annadata-0yly.onrender.com",
      "https://annadata-admin.onrender.com",
    ],
    credentials: true,
  })
);


//middleware
app.use(express.json());

//db connection
connectDb();

//api endpoint
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server stated http://localhost:${port}`);
});
