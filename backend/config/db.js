import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connect");
  } catch (error) {
    console.log(`error while connecting to mongo db database : ${error}`);
  }
};

export default connectDb;
