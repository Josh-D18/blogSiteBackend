"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default;
const BlogSchema = new mongoose_1.default.Schema({
    title: { type: String, maxlength: 70, minlength: 8 },
    content: { type: String, maxlength: 1600, minlength: 50 },
    author: { type: Schema.Types.ObjectId, ref: "User" },
});
const Blog = mongoose_1.default.model("Blog", BlogSchema);
exports.default = Blog;
