export type UserRole = "student" | "teacher" | "parent";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
  created_at: string;
}
