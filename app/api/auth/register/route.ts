import { NextResponse, NextRequest } from "next/server";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "check email and password" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "user already exist" },
        { status: 400 }
      );
    }

    await User.create({
      email,
      password,
    });

    return NextResponse.json(
      { message: "User register Successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "failed to register" }, { status: 500 });
  }
}
