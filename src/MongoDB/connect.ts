// Connect to MongoDB
import mongoose, { Mongoose } from "mongoose";

const connectToDatabase = async (): Promise<Mongoose> => {
  try {
    const MONGO_URI = process.env.MONGO_DB_URI || "";
    const connection = await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
    return connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

connectToDatabase();
