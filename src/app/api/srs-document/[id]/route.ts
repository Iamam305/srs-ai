import { connectDB } from "@/configs/db-config";
import { authMiddleware } from "@/helpers/auth-middleware";
import { Srs } from "@/models/srs-model";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const user = await authMiddleware(req);
    const srsDoc = await Srs.findOne({ _id: params.id, user: user._id });

    return NextResponse.json({
      srsDoc,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
};
