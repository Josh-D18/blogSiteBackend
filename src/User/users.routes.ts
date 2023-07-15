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
    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});

//Edit a user
router.put("/user/:id", auth, async (req: Request, res: Response) => {
  try {
    const updateFields: Record<string, any> = {};
    res.set("Content-Type", "application/json");
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

    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
