import express from "express";

const cors = require("cors");
const app = express();
const port = 5050;
require("dotenv").config();
const loginRoute = require("./Auth/login");
const registerRoute = require("./Auth/register");
import mongoDB from "./MongoDB/connect";

app.use(express.json());
app.use(cors());
app.use("/login", loginRoute);
app.use("/register", registerRoute);

mongoDB.connectToDatabase(process.env.database!);
mongoDB.connectToMongoGif();

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
