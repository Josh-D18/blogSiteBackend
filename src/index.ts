import express, { Request, Response } from "express";

const cors = require("cors");
const app = express();
const port = 5050;
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, this is Express + TypeScript");
});

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
