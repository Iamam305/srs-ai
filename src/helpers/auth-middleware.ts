import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user-model";
import { connectDB } from "@/configs/db-config";

connectDB();
export const authMiddleware = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const user: any = jwt.verify(token, process.env.TOKEN_SECRET!);
  
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
