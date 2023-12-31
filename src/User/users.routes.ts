const express = require("express");
import { Request, Response } from "express";
const router = express.Router();
import User from "../Models/User/user";
const auth = require("../Auth/auth");

// Get a user
router.get("/user/:id", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    res.set("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});

//Edit a user
router.put("/user/:id", auth, async (req: Request, res: Response) => {
  try {
    const updateFields: Record<string, any> = {};
    res.set("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    if (req.body.profileImage) {
      updateFields.profileImage = req.body.profileImage;
    }
    if (req.body.backgroundColor) {
      updateFields.backgroundColor = req.body.backgroundColor;
    }
    if (req.body.bio) {
      updateFields.bio = req.body.bio;
    }

    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      updateFields,
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
