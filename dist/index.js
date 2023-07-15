"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const app = (0, express_1.default)();
const port = 5050;
require("dotenv").config();
const loginRoute = require("./Auth/login");
const registerRoute = require("./Auth/register");
const blogRoutes = require("./Blog/blog.routes");
const userRoutes = require("./User/users.routes");
const connect_1 = __importDefault(require("./MongoDB/connect"));
app.use(express_1.default.json());
app.use(cors());
app.use("api/login", loginRoute);
app.use("api/register", registerRoute);
app.use("/api/", blogRoutes);
app.use("/api/", userRoutes);
connect_1.default.connectToDatabase(process.env.database);
connect_1.default.connectToMongoGif();
app.listen(port, () => {
    console.log(`[Server]: I am running at http://localhost:${port}`);
});
