import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    console.log("MongoDB Connecred !!");
  } catch (error) {
    if (error) throw error;
    console.log("DATABASE connection error ", error);
  }
};

export default connectDB;
