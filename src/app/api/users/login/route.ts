
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "@/models/user-model";
import { connectDB } from "@/configs/db-config";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { user_email, user_password } = reqBody;
    // console.log(reqBody);

    //check if user exists
    const user = await User.findOne({ email: user_email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    // console.log("user exists");

    //check if password is correct
    const validPassword = await bcryptjs.compare(user_password, user.password!);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    // console.log(user);

    //create token data
    const { password, verifyToken, verifyTokenExpiry, ...tokenData } =
      user._doc;
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "2d",

    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      user:{email:user.email, name:user.username}
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge:60*60*24*2
      // sameSite:true
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
