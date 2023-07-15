const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { Request, Response } from "express";
import User from "../Models/User/user";

router.post("/login", async (req: Request, res: Response) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    let user = await User.findOne({ username: username });
    const isMatch = bcrypt.compareSync(password, user!.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { username: user!.username },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
