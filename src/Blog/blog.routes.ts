const express = require("express");
import { Request, Response } from "express";
const router = express.Router();
import Blog from "../Models/Blog/blog";
import User from "../Models/User/user";
const auth = require("../Auth/auth");

// Get a blog
router.get("/blog/:id", auth, async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});

//Get blogs from a user
router.get("/user/blog/:id", auth, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user?.blogs);
  } catch (error) {
    res.status(400).json({ error });
  }
});

//Create a blog
router.post("/blog", auth, async (req: Request, res: Response) => {
  try {
    const newBlog = req.body;
    if (newBlog.title === "" || newBlog.content === "") {
      res.status(400).json({ error: "No Field Should Be Empty" });
    }
    const blog = await Blog.create(newBlog);
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});

//Edit a blog
router.put("/blog/:id", auth, async (req: Request, res: Response) => {
  try {
    const updatedBlog = req.body;
    const blog = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, {
      new: true,
    });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
