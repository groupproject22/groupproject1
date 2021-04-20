import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    mnumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const profile = mongoose.model("Profile", profileSchema);
export default profile;
