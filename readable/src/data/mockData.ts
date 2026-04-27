// Massive Mock Data for God Mode UI

export const MOCK_USERS = {
  student: {
    id: "student-1",
    email: "student@test.com",
    role: "student" as const,
    full_name: "Alex Johnson",
    level: 12,
    xp: 4500,
    nextLevelXp: 5000,
    created_at: new Date().toISOString(),
  },
  teacher: {
    id: "teacher-1",
    email: "teacher@test.com",
    role: "teacher" as const,
    full_name: "Mrs. Smith",
    created_at: new Date().toISOString(),
  },
};

export const MOCK_TEACHER_ALERTS = [
  { id: 1, type: "warning", message: "Alex hesitated on 'volcano' 3 times.", time: "10 mins ago" },
  { id: 2, type: "success", message: "Emma achieved a new fluency record (160 WPM).", time: "1 hour ago" },
  { id: 3, type: "info", message: "Marcus completed his daily reading quest.", time: "2 hours ago" },
  { id: 4, type: "warning", message: "Sarah's attention dropped below 60% in Lesson 4.", time: "3 hours ago" },
  { id: 5, type: "success", message: "Class average accuracy improved by 4% this week.", time: "1 day ago" },
];

export const MOCK_CLASS_RADAR = [
  { subject: "Phonics", A: 85, fullMark: 100 },
  { subject: "Fluency", A: 78, fullMark: 100 },
  { subject: "Comprehension", A: 92, fullMark: 100 },
  { subject: "Vocabulary", A: 88, fullMark: 100 },
  { subject: "Focus", A: 75, fullMark: 100 },
];

export const MOCK_STUDENTS_LIST = [
  { id: "student-1", name: "Alex Johnson", accuracy: 88, wpm: 120, level: 12, trend: [65, 70, 75, 82, 85, 84, 88] },
  { id: "student-2", name: "Emma Davis", accuracy: 95, wpm: 160, level: 15, trend: [90, 92, 91, 94, 93, 95, 95] },
  { id: "student-3", name: "Marcus Chen", accuracy: 75, wpm: 85, level: 8, trend: [60, 62, 65, 64, 68, 72, 75] },
  { id: "student-4", name: "Sarah Williams", accuracy: 82, wpm: 105, level: 10, trend: [80, 81, 79, 83, 80, 81, 82] },
  { id: "student-5", name: "Leo Martinez", accuracy: 91, wpm: 135, level: 14, trend: [85, 88, 89, 90, 88, 90, 91] },
];

export const MOCK_STUDENT_QUESTS = [
  { id: 1, title: "Speed Reader", description: "Read at > 130 WPM", progress: 120, total: 130, reward: "50 XP" },
  { id: 2, title: "Eagle Eye", description: "Achieve 90% accuracy", progress: 88, total: 90, reward: "100 XP" },
  { id: 3, title: "Bookworm", description: "Complete 3 lessons", progress: 2, total: 3, reward: "150 XP" },
];

export const MOCK_STUDENT_PROFILE = {
  id: "profile-1",
  student_id: "student-1",
  reading_level: 3,
  interests: ["animals", "space", "adventure"],
  dyslexia_type: "phonological",
  visual_preferences: {
    font_size: "large",
    background_color: "#FEF9C3",
    line_spacing: "wide",
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  total_sessions: 12,
  total_minutes_read: 145,
  avg_accuracy_pct: 88,
  avg_speed_wpm: 120,
  current_streak: 4,
  longest_streak: 7,
  badges: ["first_session", "three_day_streak", "accuracy_80"],
  recent_sessions: [
    {
      id: "session-1",
      lesson_id: "lesson-1",
      duration_seconds: 320,
      words_read: 210,
      accuracy_pct: 92,
      speed_wpm: 125,
      attention_score: 85,
      completed_at: new Date().toISOString(),
    },
    {
      id: "session-2",
      lesson_id: "lesson-2",
      duration_seconds: 400,
      words_read: 250,
      accuracy_pct: 86,
      speed_wpm: 110,
      attention_score: 80,
      completed_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ],
};

export const MOCK_LESSONS = [
  {
    id: "lesson-1",
    title: "The Midnight Garden",
    description: "A mysterious tale of a secret garden discovered at midnight.",
    difficulty_level: 2,
    content: "Tom discovered the hidden gate on the night of his grandmother's clock striking thirteen. Beyond the iron bars lay a garden drenched in silver moonlight. Roses climbed trellises in full bloom despite the winter chill. He pushed the gate and stepped onto the damp grass. A girl in an old-fashioned dress stood by the sundial. 'You can see me?' she whispered.",
    category: "Story",
    created_at: new Date().toISOString(),
    completed: true,
  },
  {
    id: "lesson-2",
    title: "Volcanoes: Earth's Fury",
    description: "Discover how volcanoes shape our planet.",
    difficulty_level: 3,
    content: "Beneath your feet, Earth is alive. The mantle flows slowly over millions of years, carrying tectonic plates with it. Where plates pull apart or collide, magma finds pathways to the surface. This is how volcanoes are born. Magma chambers can hold cubic kilometres of molten rock under enormous pressure.",
    category: "Science",
    created_at: new Date().toISOString(),
    completed: false,
  },
  {
    id: "lesson-3",
    title: "The First Moon Landing",
    description: "Relive the incredible journey of Apollo 11.",
    difficulty_level: 3,
    content: "On the morning of 16 July 1969, a Saturn V rocket ignited its engines and lifted Apollo 11 away from Earth. Inside the capsule sat Neil Armstrong, Buzz Aldrin, and Michael Collins. Their mission: land on the Moon and return safely. No human had attempted it before.",
    category: "History",
    created_at: new Date().toISOString(),
    completed: false,
  },
  {
    id: "lesson-4",
    title: "Deep Sea Wonders",
    description: "Explore the dark and glowing creatures of the abyss.",
    difficulty_level: 4,
    content: "Sunlight barely penetrates the twilight zone of the ocean. Below it lies the midnight zone, a realm of perpetual darkness. Yet, life thrives here. Anglerfish lure prey with glowing appendages, while giant squid hunt in the freezing depths. Many creatures create their own light through bioluminescence, turning the deep sea into a galaxy of tiny stars.",
    category: "Science",
    created_at: new Date().toISOString(),
    completed: false,
  }
];
