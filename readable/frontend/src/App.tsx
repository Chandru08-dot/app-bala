import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardPage } from "./pages/DashboardPage";
import { DiagnosticPage } from "./pages/DiagnosticPage";
import { LessonPage } from "./pages/LessonPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { StudentDetailPage } from "./pages/StudentDetailPage";
import { UploadPage } from "./pages/UploadPage";
import { Sidebar } from "./components/Sidebar";

const AppShell = () => {
  const location = useLocation();
  const isLessonRoute = location.pathname.startsWith("/lesson/");

  // Full screen for lessons
  if (isLessonRoute) {
    return (
      <div className="min-h-screen bg-[#0D0B1E]">
        <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/lesson/:lessonId" element={<LessonPage />} />
          </Routes>
        </main>
      </div>
    );
  }

  // Command Center layout for everything else
  return (
    <div className="flex min-h-screen bg-[#0D0B1E]">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden flex flex-col">
        {/* Topbar Command Strip */}
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-white/5 bg-[#16132F]/80 px-8 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-white capitalize">
            {location.pathname.replace("/", "") || "Dashboard"}
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-64 rounded-full border border-white/10 bg-[#0D0B1E] px-4 py-2 text-sm text-white focus:border-[#43CBFF] focus:outline-none"
              />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0D0B1E] text-slate-400 hover:text-white cursor-pointer relative">
              <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          </div>
        </header>
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/diagnostic" element={<DiagnosticPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/upload-new" element={<UploadPage />} />
            <Route path="/students/:studentId" element={<StudentDetailPage />} />
            <Route path="/students" element={<Navigate to="/dashboard" replace />} />
            <Route path="/quests" element={<DashboardPage />} />
            <Route path="/profile" element={<DashboardPage />} />
            <Route path="/settings" element={<DashboardPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/*" element={<AppShell />} />
      </Route>
    </Routes>
  );
}
