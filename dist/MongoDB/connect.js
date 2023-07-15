"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Connect to MongoDB
const mongoose_1 = __importDefault(require("mongoose"));
const multer_1 = __importDefault(require("multer"));
const gridfs_stream_1 = __importDefault(require("gridfs-stream"));
const connectToDatabase = (databaseName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MONGO_URI = process.env.MONGO_DB_URI || "";
        const connection = yield mongoose_1.default.connect(`${MONGO_URI}${databaseName}`);
        console.log("Connected to MongoDB");
        return connection;
    }
    catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
});
// Create GridFS storage
const connectToMongoGif = () => {
    let gfs;
    const connection = mongoose_1.default.connection.once("open", () => {
        gfs = (0, gridfs_stream_1.default)(mongoose_1.default.connection.db, mongoose_1.default.mongo);
        gfs.collection("uploads");
    });
    return connection;
};
// Set up Multer storage engine
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
exports.default = {
    storage,
    upload,
    connectToDatabase,
    connectToMongoGif,
};
