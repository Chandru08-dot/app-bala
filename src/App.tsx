import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { StudentDashboardPage } from "./pages/StudentDashboardPage";
import { TeacherDashboardPage } from "./pages/TeacherDashboardPage";
import { ParentDashboardPage } from "./pages/ParentDashboardPage";
import { ProgressPage } from "./pages/ProgressPage";
import { DiagnosticPage } from "./pages/DiagnosticPage";
import { LessonWorkshopPage } from "./pages/LessonWorkshopPage";
import { ReadingLessonPage } from "./pages/ReadingLessonPage";
import { ReaderPage } from "./pages/ReaderPage";
import { PlanetLessonPage } from "./pages/PlanetLessonPage";
import { StudentDetailPage } from "./pages/StudentDetailPage";
import { ImageGalleryPage } from "./pages/ImageGalleryPage";
import { BottomNav } from "./components/BottomNav";

const AppShell = () => {
  // Temporary auth state for demo
  const [role, setRole] = useState<string>("student");
  const location = useLocation();

  // Show shell for all non-auth routes
  const isAuthPage = location.pathname === "/" || location.pathname === "/register";
  // Full screen pages that shouldn't show the bottom nav
  const isFullScreenPage = location.pathname.includes("/diagnostic") || location.pathname.includes("/planets") || location.pathname.includes("/reader") || location.pathname.includes("/lesson/");

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-0 sm:p-4">
      {/* Mobile Frame Constraint */}
      <div className="w-full mobile-frame">
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto hide-scrollbar w-full pb-24 relative">
          
          {/* Development Helper - Role Switcher */}
          {!isAuthPage && (
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-1 rounded-2xl shadow-sm border border-white flex gap-1 z-[100]">
              {["student", "teacher", "parent"].map(r => (
                <button 
                  key={r} 
                  onClick={() => setRole(r)}
                  className={`w-8 h-8 flex items-center justify-center text-xs font-black rounded-xl uppercase transition-colors ${role === r ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-100'}`}
                >
                  {r.charAt(0)}
                </button>
              ))}
            </div>
          )}

          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/student" element={<StudentDashboardPage />} />
            <Route path="/teacher" element={<TeacherDashboardPage />} />
            <Route path="/parent" element={<ParentDashboardPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/diagnostic" element={<DiagnosticPage />} />
            <Route path="/workshop" element={<LessonWorkshopPage />} />
            <Route path="/lesson/:id" element={<ReadingLessonPage />} />
            <Route path="/reader" element={<ReaderPage />} />
            <Route path="/planets" element={<PlanetLessonPage />} />
            <Route path="/student/:id" element={<StudentDetailPage />} />
            <Route path="/gallery" element={<ImageGalleryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Bottom Navigation */}
        {!isAuthPage && !isFullScreenPage && <BottomNav role={role} />}
      </div>
    </div>
  );
};

export default function App() {
  return <AppShell />;
}
