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
    res.set("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});

//Create a blog
router.post("/blog", auth, async (req: Request, res: Response) => {
  try {
    const { title, content, author } = req.body;
    res.set("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200);
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
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});

//Edit a blog
router.put("/blog/:id", auth, async (req: Request, res: Response) => {
  try {
    const { title, content, author } = req.body;
    res.set("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    const updatedBlog = {
      title,
      content,
      author,
    };

    const blog = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, {
      new: true,
    });

    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
