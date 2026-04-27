// ============================================================
//  Readable – App Context (local state, no backend)
// ============================================================
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, SessionRecord, BadgeType } from './types';
import { MOCK_SESSIONS } from './data';

interface AppContextValue {
  user: User | null;
  sessions: SessionRecord[];
  onboardingDone: boolean;
  completeOnboarding: () => void;
  login: (fullName: string, email: string) => void;
  logout: () => void;
  addSession: (session: SessionRecord) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<SessionRecord[]>(MOCK_SESSIONS);

  const completeOnboarding = useCallback(() => setOnboardingDone(true), []);

  const login = useCallback((fullName: string, email: string) => {
    setUser({
      id: 'local-user',
      fullName,
      email,
      avatarInitials: fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
      joinedAt: new Date().toISOString(),
      currentStreak: 3,
      longestStreak: 7,
      totalSessions: MOCK_SESSIONS.length,
      totalMinutesRead: Math.round(
        MOCK_SESSIONS.reduce((s, r) => s + r.durationSeconds, 0) / 60,
      ),
      earnedBadges: ['first_session', 'accuracy_80', 'accuracy_90'] as BadgeType[],
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setOnboardingDone(false);
  }, []);

  const addSession = useCallback((session: SessionRecord) => {
    setSessions((prev) => [session, ...prev]);
    setUser((prev) => {
      if (!prev) return prev;
      const newTotal = prev.totalSessions + 1;
      const newMinutes = prev.totalMinutesRead + Math.round(session.durationSeconds / 60);
      const newStreak = prev.currentStreak + 1;
      const newLongest = Math.max(prev.longestStreak, newStreak);
      // Unlock badges
      const earned = new Set(prev.earnedBadges);
      earned.add('first_session');
      if (newStreak >= 3) earned.add('three_day_streak');
      if (newStreak >= 7) earned.add('week_streak');
      if (session.accuracyPct >= 80) earned.add('accuracy_80');
      if (session.accuracyPct >= 90) earned.add('accuracy_90');
      if (session.wpm >= 50) earned.add('speed_reader');
      if (newTotal >= 5) earned.add('lesson_5');
      if (newTotal >= 20) earned.add('lesson_20');
      if (session.accuracyPct >= 100) earned.add('perfect_score');

      return {
        ...prev,
        totalSessions: newTotal,
        totalMinutesRead: newMinutes,
        currentStreak: newStreak,
        longestStreak: newLongest,
        earnedBadges: Array.from(earned) as BadgeType[],
      };
    });
  }, []);

  return (
    <AppContext.Provider
      value={{ user, sessions, onboardingDone, completeOnboarding, login, logout, addSession }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
