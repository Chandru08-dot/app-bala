// Removed react-query and API logic. These hooks are just mocks now.
import { MOCK_STUDENT_PROFILE, MOCK_LESSONS } from "../data/mockData";

export const useStudentProfileQuery = (studentId?: string) => {
  return { data: MOCK_STUDENT_PROFILE, isLoading: false };
};

export const useStudentProgressQuery = (studentId?: string) => {
  return { data: { entries: [] }, isLoading: false };
};

export const useStudentLessonsQuery = (studentId?: string) => {
  // Convert the static mock lessons to the expected interface if needed, or just return them
  const mappedLessons = MOCK_LESSONS.map((l) => ({
    lesson_id: l.id,
    title: l.title,
    personalized_content_id: l.id,
    segment_count: 5,
    preview_text: l.description,
    support_focus: ["Phonics", "Pacing"],
    content_type: "text",
    created_at: l.created_at,
  }));
  return { data: mappedLessons, isLoading: false };
};

export const useTeacherStudentsQuery = () => {
  return { data: [], isLoading: false };
};
