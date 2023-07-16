// Connect to MongoDB
import mongoose, { Mongoose } from "mongoose";

const connectToDatabase = async (databaseName: string): Promise<Mongoose> => {
  try {
    const MONGO_URI = process.env.MONGO_DB_URI || "";
    const connection = await mongoose.connect(`${MONGO_URI}${databaseName}`);
    console.log("Connected to MongoDB");
    return connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

export default {
  connectToDatabase,
};
