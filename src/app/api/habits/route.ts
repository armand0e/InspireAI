import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, type, userId } = body;

    // Basic validation
    if (!name || !type || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const habit = await prisma.habit.create({
      data: {
        name,
        description,
        type,
        userId,
      },
    });

    return NextResponse.json(habit, { status: 201 });
  } catch (error) {
    console.error("Error creating habit:", error);
    return NextResponse.json({ error: "Error creating habit" }, { status: 500 });
  }
} 