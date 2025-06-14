"use client";

import { useState } from "react";
import { HabitType } from "@/types";
import { useRouter } from "next/navigation";

export default function NewHabitPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<HabitType>("good");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          type,
          userId: "cl_test_user_id" // Hardcoded for now
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create habit');
      }

      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8">Create a New Habit</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium mb-2">
            Habit Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="e.g., Go for a run"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-medium mb-2">
            Description (Optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="e.g., Run for 30 minutes every morning"
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Habit Type</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setType("good")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                type === "good"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              disabled={isSubmitting}
            >
              Good Habit
            </button>
            <button
              type="button"
              onClick={() => setType("bad")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                type === "bad"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              disabled={isSubmitting}
            >
              Bad Habit
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors font-bold disabled:bg-blue-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Habit"}
        </button>
      </form>
    </div>
  );
} 