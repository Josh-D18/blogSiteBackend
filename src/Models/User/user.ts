import mongoose from "mongoose";

interface IUser extends Document {
  username: string;
  password: string;
  backgroundColor: String;
  bio: String;
  blogs: mongoose.Types.ObjectId[];
}

const UserSchema: mongoose.Schema<IUser> = new mongoose.Schema({
  username: String,
  password: String,
  backgroundColor: String,
  bio: String,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
});

const User = mongoose.model("User", UserSchema);
export default User;
