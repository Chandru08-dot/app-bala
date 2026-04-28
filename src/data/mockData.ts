export const MOCK_USER = {
  student: {
    student_id: "STU-001",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "student",
    dyslexia_type: "Phonological", // Options: "Phonological", "Working Memory", "Visual"
    reading_level: "Level 4",
    avg_speed_wpm: 125,
    avg_accuracy_pct: 92,
    attention_score: 88,
    difficult_words: ["Through", "Thought", "Bough"],
    recent_sessions: 14
  },
  teacher: {
    teacher_id: "TCH-001",
    name: "Mrs. Sarah Davis",
    email: "teacher@example.com",
    role: "teacher"
  },
  parent: {
    parent_id: "PAR-001",
    name: "David Johnson",
    email: "parent@example.com",
    role: "parent",
    children: ["STU-001"]
  }
};

export const MOCK_STUDENTS = [
  MOCK_USER.student,
  {
    student_id: "STU-002",
    name: "Mia Patel",
    email: "mia@example.com",
    reading_level: "Level 5",
    avg_speed_wpm: 140,
    avg_accuracy_pct: 95,
    attention_score: 91,
    difficult_words: ["Receive", "Believe"],
    recent_sessions: 18
  },
  {
    student_id: "STU-003",
    name: "Leo Garcia",
    email: "leo@example.com",
    reading_level: "Level 3",
    avg_speed_wpm: 95,
    avg_accuracy_pct: 82,
    attention_score: 75,
    difficult_words: ["Enough", "Tough", "Rough"],
    recent_sessions: 8
  }
];

export const MOCK_LESSONS = [
  {
    lesson_id: "LES-001",
    title: "The Great Barrier Reef",
    preview_text: "The Great Barrier Reef is the world's largest coral reef system...",
    support_focus: "Phonics: 'ee' and 'ea'",
    segment_count: 5,
    created_at: "2023-10-15T10:00:00Z"
  },
  {
    lesson_id: "LES-002",
    title: "Solar System Journey",
    preview_text: "Our solar system consists of our star, the Sun, and everything bound to it by gravity...",
    support_focus: "Vocabulary: Planets and Space",
    segment_count: 8,
    created_at: "2023-10-18T14:30:00Z"
  }
];

export const MOCK_SESSIONS = [
  {
    session_id: "SESS-101",
    session_type: "Reading Practice",
    status: "Completed",
    started_at: "2023-10-24T09:00:00Z",
    ended_at: "2023-10-24T09:15:00Z",
    accuracy_pct: 94,
    speed_wpm: 128
  },
  {
    session_id: "SESS-102",
    session_type: "Diagnostic Quest",
    status: "Completed",
    started_at: "2023-10-23T14:00:00Z",
    ended_at: "2023-10-23T14:10:00Z",
    accuracy_pct: 89,
    speed_wpm: 115
  }
];

export const MOCK_OCR_PREVIEW = `THE SOLAR SYSTEM

Our solar system is home to eight amazing planets. They all orbit around a giant star we call the Sun. Mercury is the closest planet to the Sun, and it gets very hot! Venus is covered in thick clouds. Earth is our home, and it has liquid water. Mars is known as the Red Planet because of its rusty dust. Jupiter is the largest planet, followed by Saturn with its beautiful rings. Uranus and Neptune are the cold ice giants far away.`;

export const MOCK_PERSONALIZED_OUTPUTS = [
  {
    student_id: "STU-001",
    student_name: "Alex Johnson",
    reading_level: "Level 4",
    content: "Our solar system has eight planets. They go around the Sun. Earth is our home. Mars is the Red Planet. Jupiter is the biggest."
  },
  {
    student_id: "STU-003",
    student_name: "Leo Garcia",
    reading_level: "Level 3",
    content: "There are 8 planets. The Sun is in the middle. We live on Earth. Mars is red. Jupiter is very big."
  }
];
