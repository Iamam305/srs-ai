import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerfied: {
    type: Boolean,
    default: false,
  },

  
  verifyToken: String,
  verifyTokenExpiry: Date,
  createdAt:{
    type:Date,
    default:Date.now()
  },
  monthlyQouta:{
    type:Number,
    default:2000
  }
});



export const User = mongoose.models.User || mongoose.model("User", userSchema);