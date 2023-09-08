import { connectDB } from "@/configs/db-config";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Srs } from "@/models/srs-model";
import { authMiddleware } from "@/helpers/auth-middleware";
import { User } from "@/models/user-model";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
connectDB();

// export const runtime = "edge";
export const POST = async (req: NextRequest) => {
  try {
    const user = await authMiddleware(req);
    const { name, platform, description, features } = await req.json();

    const prompt = `Generate a Software Requirements Specification (Srs) document for a software application. The app, named ${name} is designed for ${platform}.Which is ${description} and aims to features of ${features} Please provide detailed requirements, including functional and non-functional aspects, user interfaces, performance expectations, security measures, and any relevant details. If any input appears illogical, it can be ignored. Ensure the Srs document maintains clarity and completeness.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      // stream: true,
      messages: [{ role: "user", content: prompt }],
    });
    console.log(response.choices[0].message.content);

    const newSrsDoc = new Srs({
      appName: name,
      platform,
      description,
      features,
      user: user._id,
      document: response.choices[0].message.content,
    });
    await newSrsDoc.save();
    return NextResponse.json({ document: newSrsDoc });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const user = await authMiddleware(req);
    const srsDocs = await Srs.find({ user: user });
    return NextResponse.json({
      srsDocs,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
};
