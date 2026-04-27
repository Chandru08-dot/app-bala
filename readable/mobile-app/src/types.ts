export interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: number;
  content: string;
  unlocked: boolean;
  completed: boolean;
  planet: string;
}

export interface Session {
  id: string;
  missionId: string;
  startTime: Date;
  endTime?: Date;
  accuracy: number;
  speed: number;
  focus: number;
  voiceAnalysis: {
    hesitations: number;
    pronunciation: number;
  };
  review: string;
}

export interface StudentProgress {
  id: string;
  studentId: string;
  totalSessions: number;
  averageAccuracy: number;
  longestStreak: number;
  currentStreak: number;
  completedMissions: string[];
}