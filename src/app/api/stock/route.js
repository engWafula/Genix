import {isAdmin} from "@/app/api/auth/[...nextauth]/route";
import {Stock} from "@/models/Stock";
import mongoose from "mongoose";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();

  if (await isAdmin()) {
    const stock = await Stock.create(data);
    return Response.json(stock);
  } else {
    return Response.json({});
  }
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);
    return Response.json(
      await Stock.find()
    );
  }