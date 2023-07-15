const express = require("express");
import { Request, Response } from "express";
const router = express.Router();
import User from "../Models/User/user";
const auth = require("../../Auth/auth");

// Get a user
router.get("/user", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById({ _id: req.body.id });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});

//Edit a user
router.put("/user", auth, async (req: Request, res: Response) => {
  try {
    const updateFields: Record<string, any> = {};
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
      { _id: req.body.id },
      updateFields,
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});
