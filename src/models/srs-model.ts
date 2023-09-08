import mongoose from "mongoose";

const { Schema } = mongoose;

const srsSchema = new Schema({
  appName: {
    type: String,
    required: true,
  },
  platform: { type: String, required: true },
  description: {
    type: String,
  },
  features: {
    type: String,
    required: true,
  },
  document: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
});

export const Srs =   mongoose.models.Srs|| mongoose.model("Srs", srsSchema);   