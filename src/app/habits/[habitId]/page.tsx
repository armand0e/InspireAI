"use client";

import { Habit, AiDashboardContent } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// A component to render the AI-generated content
const AiDashboard = ({ content }: { content: AiDashboardContent }) => {
    if (!content) {
        return <p>No AI content available.</p>;
    }

    return (
        <div className="prose lg:prose-xl mt-6">
            <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
            <p>{content.introduction}</p>
            
            <h3 className="text-2xl font-bold mt-6 mb-4">Key Insights</h3>
            <ul>
                {content.insights?.map((insight: string, index: number) => (
                    <li key={index}>{insight}</li>
                ))}
            </ul>

            <h3 className="text-2xl font-bold mt-6 mb-4">Your Potential Progress</h3>
            <p>{content.progress_visualization}</p>
        </div>
    );
};


export default function HabitDetailPage() {
    const params = useParams();
    const habitId = params.habitId as string;

    const [habit, setHabit] = useState<Habit | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (!habitId) return;

        const fetchHabit = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/habits/${habitId}`);
                if (!response.ok) throw new Error("Failed to fetch habit");
                const data = await response.json();
                setHabit(data);

                // If AI content is missing, generate it
                if (data && !data.aiDashboardContent) {
                    generateAiContent(data);
                }

            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHabit();
    }, [habitId]);

    const generateAiContent = async (habitData: Habit) => {
        if (isGenerating) return;
        setIsGenerating(true);
        try {
            const response = await fetch(`/api/habits/${habitId}/ai-dashboard`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ habitName: habitData.name, habitType: habitData.type }),
            });
            if (!response.ok) throw new Error("Failed to generate AI content");
            const newContent = await response.json();
            
            // Update the habit state with the new AI content
            setHabit(prevHabit => prevHabit ? { ...prevHabit, aiDashboardContent: newContent } : null);

        } catch (error) {
            console.error("Error generating AI content:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    if (isLoading) {
        return <div className="p-8">Loading...</div>;
    }

    if (!habit) {
        return <div className="p-8">Habit not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <header className="mb-8">
                <h1 className="text-5xl font-bold">{habit.name}</h1>
                <p className="text-xl text-gray-600">{habit.description}</p>
            </header>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
                {(habit.aiDashboardContent) ? (
                    <AiDashboard content={habit.aiDashboardContent} />
                ) : (
                    <div className="text-center">
                        <p className="text-lg">
                            {isGenerating ? "Generating your personalized dashboard, please wait..." : "No AI dashboard found."}
                        </p>
                        {!isGenerating && <button onClick={() => generateAiContent(habit)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Generate Now</button>}
                    </div>
                )}
            </div>
        </div>
    );
} 