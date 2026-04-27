import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserRole } from "../types/auth";

interface AuthState {
  user: User | null;
  role: UserRole | null;
  login: (user: User) => void;
  logout: () => void;
}

export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      login: (user) =>
        set({
          user,
          role: user.role,
        }),
      logout: () =>
        set({
          user: null,
          role: null,
        }),
    }),
    { name: "readable-auth" },
  ),
);
