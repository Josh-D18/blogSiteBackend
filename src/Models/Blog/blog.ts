import mongoose from "mongoose";
const { Schema } = mongoose;

const BlogSchema = new Schema({
  title: [{ type: String, maxlength: 70, minlength: 8 }],
  content: [{ type: String, maxlength: 1600, minlength: 300 }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
