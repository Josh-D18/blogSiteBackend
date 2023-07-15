import mongoose from "mongoose";
const Schema = mongoose;

interface IBlog extends Document {
  title: string;
  content: string;
  author: {
    type: typeof mongoose.Types.ObjectId;
    ref: string;
  };
}

const BlogSchema: mongoose.Schema<IBlog> = new mongoose.Schema({
  title: { type: String, maxlength: 70, minlength: 8 },
  content: { type: String, maxlength: 1600, minlength: 300 },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;
