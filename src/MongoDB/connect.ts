// Connect to MongoDB
import mongoose, { Mongoose } from "mongoose";
import multer from "multer";
import Grid from "gridfs-stream";

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

// Create GridFS storage
const connectToMongoGif = () => {
  let gfs: Grid.Grid;
  const connection = mongoose.connection.once("open", () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection("uploads");
  });
  return connection;
};

// Set up Multer storage engine
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default {
  storage,
  upload,
  connectToDatabase,
  connectToMongoGif,
};
