import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  password: String,
  profileImage: {
    data: Buffer,
    contentType: String,
  },
  backgroundColor: String,
  blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
