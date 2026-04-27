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
import { HallOfFamePage } from "./pages/HallOfFamePage";

const AppShell = () => {
  const location = useLocation();
  const isLessonRoute = location.pathname.startsWith("/lesson/");
  const { fontFamily, letterSpacing, lineHeight } = useSettings();

  useEffect(() => {
    // Mobile Voice Engine Warmup
    const unlockAudio = () => {
      const utterance = new SpeechSynthesisUtterance("");
      utterance.volume = 0;
      window.speechSynthesis.speak(utterance);
      window.removeEventListener('click', unlockAudio);
      console.log("Audio Engine Unlocked for Mobile");
    };
    window.addEventListener('click', unlockAudio);
    return () => window.removeEventListener('click', unlockAudio);
  }, []);

  return (
    <div 
      className={`flex min-h-screen justify-center transition-all duration-300 ${fontFamily === 'OpenDyslexic' ? 'dyslexia-mode' : ''}`}
      style={{ 
        letterSpacing: `${letterSpacing}px`,
        lineHeight: lineHeight
      }}
    >
      <CosmicBackground />
      <DyslexiaToolbar />
      {/* Mobile Frame Container */}
      <div className="relative flex min-h-screen w-full max-w-[450px] flex-col overflow-hidden bg-[#0D0B1E]/90 shadow-[0_0_100px_rgba(0,0,0,0.5)] z-10">
        <main className={`flex-1 ${!isLessonRoute ? "pb-24" : ""}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-full"
            >
              <Routes location={location}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/expedition" element={<SolarSystemPage />} />
                <Route path="/achievements" element={<AchievementsPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/telemetry" element={<MissionControlPage />} />
                <Route path="/training" element={<PhonemeTrainingPage />} />
                <Route path="/games" element={<GamesHubPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/inbox" element={<InboxPage />} />
                <Route path="/flashcards" element={<FlashcardPage />} />
                <Route path="/fame" element={<HallOfFamePage />} />
                <Route path="/certificates" element={<ReadingCertificatesPage />} />
                <Route path="/parent" element={<ParentDashboardPage />} />
                <Route path="/teacher" element={<TeacherDashboardPage />} />
                <Route path="/diagnostic" element={<DiagnosticPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/upload-new" element={<UploadPage />} />
                <Route path="/lesson/:lessonId" element={<LessonPage />} />
                <Route path="/students/:studentId" element={<StudentDetailPage />} />
                <Route path="/quests" element={<DashboardPage />} />
                <Route path="/profile" element={<DashboardPage />} />
                <Route path="/settings" element={<DashboardPage />} />
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
