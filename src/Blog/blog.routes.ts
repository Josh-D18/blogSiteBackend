const express = require("express");
import { Request, Response } from "express";
const router = express.Router();
import Blog from "../Models/Blog/blog";
import User from "../Models/User/user";
const auth = require("../../Auth/auth");

// Get a blog
router.get("/blog/", auth, async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById({ _id: req.body.id });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});

//Get blogs from a user
router.get("/user/blog", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById({ _id: req.body.id });
    res.json(user?.blogs);
  } catch (error) {
    res.status(400).json({ error });
  }
});

//Create a blog
router.post("/blog", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById({ _id: req.body.id });
    res.json(user?.blogs);
  } catch (error) {
    res.status(400).json({ error });
  }
});

//Edit a blog
router.put("/user/blog", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById({ _id: req.body.id });
    res.json(user?.blogs);
  } catch (error) {
    res.status(400).json({ error });
  }
});
