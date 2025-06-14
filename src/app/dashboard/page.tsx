"use client";

import { Habit } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const HabitCard = ({ habit }: { habit: Habit }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <h3 className="text-xl font-bold">{habit.name}</h3>
    <p className={`text-sm font-semibold ${habit.type === 'good' ? 'text-green-500' : 'text-red-500'}`}>
      {habit.type === 'good' ? 'Good Habit' : 'Bad Habit'}
    </p>
    <div className="mt-4">
      <p>Current Streak: {habit.currentStreak} days</p>
      <p>Longest Streak: {habit.longestStreak} days</p>
    </div>
  </div>
);

export default function DashboardPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHabits = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/habits/list?userId=cl_test_user_id'); // Hardcoded userId
        if (!response.ok) {
          throw new Error('Failed to fetch habits');
        }
        const data = await response.json();
        setHabits(data);
      } catch (error) {
        console.error(error);
        // Handle error state in UI
      } finally {
        setIsLoading(false);
      }
    };

    fetchHabits();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Your Habits</h1>
        <Link href="/habits/new" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            + New Habit
        </Link>
      </header>
      {isLoading ? (
        <p>Loading habits...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </div>
      )}
    </div>
  );
} 