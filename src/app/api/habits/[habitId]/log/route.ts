import { prisma, Prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Function to get the start of a given date
const getStartOfDay = (date: Date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
};

export async function POST(
    req: Request,
    { params }: { params: { habitId: string } }
) {
    try {
        const { habitId } = params;

        if (!habitId) {
            return NextResponse.json({ error: "habitId is required" }, { status: 400 });
        }

        const today = getStartOfDay(new Date());

        // Check if the habit was already logged today
        const existingLog = await prisma.habitLog.findFirst({
            where: {
                habitId: habitId,
                date: today,
            },
        });

        if (existingLog?.completed) {
            return NextResponse.json({ message: "Habit already logged for today." }, { status: 200 });
        }

        // Use a transaction to ensure data consistency
        const updatedHabit = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            // Create the log for today
            await tx.habitLog.create({
                data: {
                    habitId: habitId,
                    date: today,
                    completed: true,
                },
            });

            // --- Streak Calculation Logic ---
            const habit = await tx.habit.findUnique({ where: { id: habitId } });
            if (!habit) throw new Error("Habit not found");

            const yesterday = getStartOfDay(new Date());
            yesterday.setDate(yesterday.getDate() - 1);

            const yesterdayLog = await tx.habitLog.findFirst({
                where: {
                    habitId: habitId,
                    date: yesterday,
                    completed: true,
                },
            });
            
            let newCurrentStreak = habit.currentStreak;

            if (yesterdayLog) {
                // Continue the streak
                newCurrentStreak++;
            } else {
                // Reset the streak
                newCurrentStreak = 1;
            }

            // Update the habit with new streak info
            const updated = await tx.habit.update({
                where: { id: habitId },
                data: {
                    currentStreak: newCurrentStreak,
                    longestStreak: Math.max(habit.longestStreak, newCurrentStreak),
                },
            });

            return updated;
        });


        return NextResponse.json(updatedHabit, { status: 200 });

    } catch (error) {
        console.error("Error logging habit:", error);
        return NextResponse.json({ error: "Error logging habit" }, { status: 500 });
    }
} 