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
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const blog = await Blog.create({
      title,
      content,
      author,
    });

    await User.findByIdAndUpdate(author, {
      $push: { blogs: blog._id },
    });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});

//Edit a blog
router.put("/blog/:id", auth, async (req: Request, res: Response) => {
  try {
    const { title, content, author } = req.body;

    const updatedBlog = {
      title,
      content,
      author,
    };

    const blog = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, {
      new: true,
    });

    res.json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
