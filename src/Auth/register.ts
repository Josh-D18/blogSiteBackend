const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { Request, Response } from "express";
import User from "../Models/User/user";

router.post("/register", async (req: Request, res: Response) => {
  try {
    let username = await req.body.username;
    let password = await req.body.password;
    let bio = await req.body.bio;
    let user = await User.findOne({ username });

    if (user?.username!.toLowerCase() === username.toLowerCase()) {
      res.status(400).json({ ERROR: "Username is already taken" });
      return;
    }

    if (username === "" || password === "" || bio === "") {
      res.status(400).json({ Error: "Field Cannot be empty" });
      return;
    }

    bcrypt.hash(password, 8).then(async (hashpassword: any) => {
      const user = new User({
        username: username,
        password: hashpassword,
        backgroundColor: "#149c81",
        bio: bio,
      });
      const token = await jwt.sign(
        { username: user.username, password: user.password },
        process.env.JWT_SECRET,
        {
          expiresIn: "4h",
        }
      );

      await user.save();
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.status(200).json(token);
    });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

module.exports = router;
