import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    post: { type: String, required: true },
    friends: { type: Array },
    imageUrl: { type: String }
  },
  {
    timestamps: true
  }
);

const userPost = mongoose.model("userPost", postSchema);
export default userPost;
