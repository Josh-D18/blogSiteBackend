const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { Request, Response } from "express";
import User from "../Models/User/user";

// Signup
router.post("/", async (req: Request, res: Response) => {
  try {
    let username = await req.body.username;
    let password = await req.body.password;
    let user = await User.findOne({ username });

    if (user?.username!.toLowerCase() === username.toLowerCase()) {
      res.status(400).json({ ERROR: "Username is already taken" });
      return;
    }

    if (username === "" || password === "") {
      res.status(400).json({ Error: "Field Cannot be empty" });
      return;
    }

    const file = req.file;

    if (!file) {
      res.status(400).json({ error: "No image file uploaded" });
      return;
    }

    bcrypt.hash(password, 8).then(async (hashpassword: any) => {
      const user = new User({
        username: username,
        password: hashpassword,
        profileImage: {
          data: file.buffer,
          contentType: file.mimetype,
        },
        backgroundColor: "#a01bd4",
      });
      const token = await jwt.sign(
        { username: user.username, password: user.password },
        process.env.JWT_SECRET,
        {
          expiresIn: "4h",
        }
      );
      await user.save();
      res.json(token);
    });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

module.exports = router;