import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DashboardPage } from "./pages/DashboardPage";
import { DiagnosticPage } from "./pages/DiagnosticPage";
import { LessonPage } from "./pages/LessonPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { StudentDetailPage } from "./pages/StudentDetailPage";
import { UploadPage } from "./pages/UploadPage";
import { BottomNav } from "./components/BottomNav";
import { SolarSystemPage } from "./pages/SolarSystemPage";
import { AchievementsPage } from "./pages/AchievementsPage";
import { ShopPage } from "./pages/ShopPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { MissionControlPage } from "./pages/MissionControlPage";
import { PhonemeTrainingPage } from "./pages/PhonemeTrainingPage";
import { GamesHubPage } from "./pages/GamesHubPage";
import { CommunityPage } from "./pages/CommunityPage";
import { InboxPage } from "./pages/InboxPage";
import { FlashcardPage } from "./pages/FlashcardPage";
import { VocabularyGardenPage } from "./pages/VocabularyGardenPage";
import { ReadingCertificatesPage } from "./pages/ReadingCertificatesPage";
import { ParentDashboardPage } from "./pages/ParentDashboardPage";
import { TeacherDashboardPage } from "./pages/TeacherDashboardPage";
import { CosmicBackground } from "./components/CosmicBackground";
import { DyslexiaToolbar } from "./components/DyslexiaToolbar";
import { useSettings } from "./stores/settingsStore";
import { StudentDashboardPage } from "./pages/StudentDashboardPage";
import { HallOfFamePage } from "./pages/HallOfFamePage";

const AppShell = () => {
  const location = useLocation();
  const isLessonRoute = location.pathname.startsWith("/lesson/");
  const { fontFamily, letterSpacing, lineHeight } = useSettings();

  useEffect(() => {
    const unlockAudio = () => {
      const utterance = new SpeechSynthesisUtterance("");
      utterance.volume = 0;
      window.speechSynthesis.speak(utterance);
      window.removeEventListener('click', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    return () => window.removeEventListener('click', unlockAudio);
  }, []);

  return (
    <div 
      className={`flex min-h-screen justify-center transition-all duration-300 bg-slate-50 ${fontFamily === 'OpenDyslexic' ? 'dyslexia-mode' : ''}`}
      style={{ 
        letterSpacing: `${letterSpacing}px`,
        lineHeight: lineHeight
      }}
    >
      <DyslexiaToolbar />
      {/* Mobile Frame Container */}
      <div className="relative flex min-h-screen w-full max-w-[450px] flex-col overflow-hidden bg-white shadow-2xl z-10 border-x border-slate-200">
        <main className={`flex-1 ${!isLessonRoute ? "pb-24" : ""}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="min-h-full"
            >
              <Routes location={location}>
                <Route path="/dashboard" element={<StudentDashboardPage />} />
                <Route path="/diagnostic" element={<DiagnosticPage />} />
                <Route path="/lesson/:lessonId" element={<LessonPage />} />
                <Route path="/parent" element={<ParentDashboardPage />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        
        {!isLessonRoute && <BottomNav />}
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
