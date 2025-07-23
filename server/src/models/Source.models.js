import mongoose from "mongoose";

const sourceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Source", sourceSchema);