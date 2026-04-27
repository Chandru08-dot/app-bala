import { Mission, Session, StudentProgress } from './types';

// Mock data for frontend-only app
export const mockMissions: Mission[] = [
  {
    id: '1',
    title: 'Planet Alpha - Basic Words',
    description: 'Learn basic sight words and simple sentences.',
    difficulty: 1,
    content: 'The cat sat on the mat. The dog ran in the park. I like to read books.',
    unlocked: true,
    completed: false,
    planet: 'Alpha',
  },
  {
    id: '2',
    title: 'Planet Beta - Short Stories',
    description: 'Read short stories with more complex words.',
    difficulty: 2,
    content: 'Once upon a time, there was a brave knight who lived in a castle. He had a shiny sword and a loyal horse.',
    unlocked: false,
    completed: false,
    planet: 'Beta',
  },
  {
    id: '3',
    title: 'Planet Gamma - Adventure Tales',
    description: 'Embark on exciting adventures with challenging vocabulary.',
    difficulty: 3,
    content: 'In the enchanted forest, magical creatures danced under the moonlight. The wise owl guided the lost travelers to safety.',
    unlocked: false,
    completed: false,
    planet: 'Gamma',
  },
];

export const mockSessions: Session[] = [
  {
    id: '1',
    missionId: '1',
    startTime: new Date('2024-01-15T10:00:00'),
    endTime: new Date('2024-01-15T10:15:00'),
    accuracy: 85,
    speed: 120,
    focus: 90,
    voiceAnalysis: {
      hesitations: 3,
      pronunciation: 88,
    },
    review: 'Great job! You read with good accuracy. Try to speak more confidently on longer words.',
  },
];

export const mockProgress: StudentProgress = {
  id: '1',
  studentId: '1',
  totalSessions: 5,
  averageAccuracy: 82,
  longestStreak: 3,
  currentStreak: 2,
  completedMissions: ['1'],
};