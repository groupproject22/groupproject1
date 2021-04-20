import mongoose from "mongoose";

const marketPlaceSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    price: { type: String, required: true },
    imageUrl: { type: String }
  },
  {
    timestamps: true
  }
);

const marketPlace = mongoose.model("marketPlace", marketPlaceSchema);
export default marketPlace;
