import express from "express";

const cors = require("cors");
const app = express();
const port = process.env.PORT || 5050;
require("dotenv").config();
const loginRoute = require("./Auth/login");
const registerRoute = require("./Auth/register");
const blogRoutes = require("./Blog/blog.routes");
const userRoutes = require("./User/users.routes");
import mongoDB from "./MongoDB/connect";

app.use(cors());
app.use(express.json());
app.use("/api/", loginRoute);
app.use("/api/", registerRoute);
app.use("/api/", blogRoutes);
app.use("/api/", userRoutes);

mongoDB.connectToDatabase(process.env.database!);

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
