"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const blog_1 = __importDefault(require("../Models/Blog/blog"));
const user_1 = __importDefault(require("../Models/User/user"));
const auth = require("../Auth/auth");
// Get a blog
router.get("/blog/:id", auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blog_1.default.findById(req.params.id);
        res.set("Content-Type", "application/json");
        res.json(blog);
    }
    catch (error) {
        res.status(400).json({ error });
    }
}));
//Create a blog
router.post("/blog", auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, author } = req.body;
        res.set("Content-Type", "application/json");
        if (!title || !content || !author) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const blog = yield blog_1.default.create({
            title,
            content,
            author,
        });
        yield user_1.default.findByIdAndUpdate(author, {
            $push: { blogs: blog._id },
        });
        res.json(blog);
    }
    catch (error) {
        res.status(400).json({ error });
    }
}));
//Edit a blog
router.put("/blog/:id", auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, author } = req.body;
        res.set("Content-Type", "application/json");
        const updatedBlog = {
            title,
            content,
            author,
        };
        const blog = yield blog_1.default.findByIdAndUpdate(req.params.id, updatedBlog, {
            new: true,
        });
        res.json(blog);
    }
    catch (error) {
        res.status(400).json({ error });
    }
}));
module.exports = router;
