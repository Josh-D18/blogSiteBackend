import { NextFunction } from "express";
import { Request, Response } from "express";
const jwt = require("jsonwebtoken");

let auth = (req: Request | any, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login!");
  }

  const authToken = req.headers.authorization.split(" ")[1];

  jwt.verify(authToken, process.env.JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).send("Invalid auth token");
    }

    req.decoded = decoded;
    next();
  });
};

module.exports = auth;
