import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const habits = await prisma.habit.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(habits, { status: 200 });
  } catch (error) {
    console.error("Error fetching habits:", error);
    return NextResponse.json({ error: "Error fetching habits" }, { status: 500 });
  }
} 