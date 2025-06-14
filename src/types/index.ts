export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export type HabitType = "good" | "bad";

export interface AiDashboardContent {
  title: string;
  introduction: string;
  insights: string[];
  progress_visualization: string;
}

export interface Habit {
  id: string;
  userId: string;
  name: string;
  description?: string;
  type: HabitType;
  createdAt: Date;
  currentStreak: number;
  longestStreak: number;
  aiDashboardContent?: AiDashboardContent | null;
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: Date;
  completed: boolean; // For 'good' habits
  notes?: string;
  // For 'bad' habits, we might track occurrences instead of completion
  occurrences?: number; 
} 