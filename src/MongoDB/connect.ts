// Connect to MongoDB
import mongoose, { Mongoose } from "mongoose";
import multer from "multer";
import Grid from "gridfs-stream";
import { Readable } from "stream";

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

// Create GridFS storage
let gfs: Grid.Grid;
mongoose.connection.once("open", () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Set up Multer storage engine
const storage = multer.memoryStorage();
const upload = multer({ storage });

connectToDatabase();

export default {
  storage,
  upload,
};
