// ============================================================
//  Readable – Core Types (Frontend-only, no backend deps)
// ============================================================

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export type BadgeType =
  | 'first_session'
  | 'three_day_streak'
  | 'week_streak'
  | 'accuracy_80'
  | 'accuracy_90'
  | 'speed_reader'
  | 'lesson_5'
  | 'lesson_20'
  | 'perfect_score';

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarInitials: string;
  joinedAt: string;
  currentStreak: number;
  longestStreak: number;
  totalSessions: number;
  totalMinutesRead: number;
  earnedBadges: BadgeType[];
}

export interface LessonPassage {
  id: string;
  text: string;
  wordCount: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: 'story' | 'science' | 'history' | 'adventure' | 'poetry';
  difficultyLevel: DifficultyLevel;
  estimatedMinutes: number;
  passages: LessonPassage[];
  coverEmoji: string;
  gradientColors: readonly [string, string];
}

export interface SessionRecord {
  id: string;
  lessonId: string;
  lessonTitle: string;
  completedAt: string;
  durationSeconds: number;
  wordsRead: number;
  wpm: number;
  accuracyPct: number;
  attentionScore: number;
}

export interface Achievement {
  id: BadgeType;
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  progress?: number;   // 0-1
  target?: number;
  current?: number;
}

export interface AppState {
  user: User | null;
  sessions: SessionRecord[];
  onboardingDone: boolean;
}
