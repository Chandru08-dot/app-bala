import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import { MOCK_LESSONS } from "../data/mockData";
import { X, Play, Square, Award, Sparkles, ChevronRight, Settings, Type, AlignLeft, Activity } from "lucide-react";
import { useVoiceAnalysis } from "../hooks/useVoiceAnalysis";
import { SquirrelGuide } from "../components/SquirrelGuide";
import { useSettings } from "../stores/settingsStore";

export const LessonPage = () => {
  const { lessonId } = useParams();
  const lesson = MOCK_LESSONS.find((l) => l.id === lessonId) || MOCK_LESSONS[0];
  
  const [phase, setPhase] = useState<"landing" | "active" | "report">("landing");
  const [showSettings, setShowSettings] = useState(false);
  const [isZenMode, setIsZenMode] = useState(false);
  const [isSoundscapeOn, setIsSoundscapeOn] = useState(false);
  
  const { 
    fontSize, setFontSize,
    lineHeight, setLineHeight,
    letterSpacing, setLetterSpacing
  } = useSettings();

  const { 
    isRecording, 
    currentWordIndex, 
    startRecording, 
    stopRecording, 
    words,
    error 
  } = useVoiceAnalysis(lesson.content);

  const paragraphs = lesson.content.split(/(?<=[.!?])\s+/).filter(Boolean);

  const handleStart = () => {
    setPhase("active");
    startRecording();
    toast.success("Ready? Start reading out loud!");
  };

  const handleFinish = () => {
    stopRecording();
    setPhase("report");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const getSquirrelMessage = () => {
    if (phase === "landing") return "Welcome back, Explorer! Ready to conquer this mission?";
    if (phase === "active") {
      if (currentWordIndex === -1) return "I'm listening! Start whenever you're ready.";
      if (currentWordIndex > words.length * 0.8) return "Almost there! You're doing amazing!";
      return "Keep going! You're reading beautifully.";
    }
    return "WOW! Look at those scores! You're a reading superstar!";
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isZenMode ? "bg-[#05040a]" : "bg-[#0D0B1E]"} text-white flex flex-col overflow-hidden relative`}>
      <AnimatePresence>
        {!isZenMode && <SquirrelGuide message={getSquirrelMessage()} />}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-x-0 bottom-0 z-[60] bg-[#16132F] rounded-t-[3rem] p-8 border-t border-white/10 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black">Reading Settings</h3>
              <button onClick={() => setShowSettings(false)} className="p-2 rounded-full bg-white/5"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[#43CBFF]" />
                  <span className="text-sm font-bold">Zen Mode</span>
                </div>
                <button 
                  onClick={() => setIsZenMode(!isZenMode)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${isZenMode ? "bg-[#43CBFF]" : "bg-white/10"}`}
                >
                  <motion.div 
                    animate={{ x: isZenMode ? 24 : 4 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full"
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                <div className="flex items-center gap-3">
                  <AlignLeft className="w-5 h-5 text-[#A855F7]" />
                  <span className="text-sm font-bold">Ambient Sound</span>
                </div>
                <button 
                  onClick={() => setIsSoundscapeOn(!isSoundscapeOn)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${isSoundscapeOn ? "bg-[#A855F7]" : "bg-white/10"}`}
                >
                  <motion.div 
                    animate={{ x: isSoundscapeOn ? 24 : 4 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full"
                  />
                </button>
              </div>

              <div>
                <div className="flex justify-between mb-4">
                  <span className="text-sm font-bold text-slate-400">Font Size</span>
                  <span className="text-sm font-black text-[#43CBFF]">{fontSize}px</span>
                </div>
                <input 
                  type="range" min="16" max="42" value={fontSize} 
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full accent-[#43CBFF]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === "landing" && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col p-6 pt-12"
          >
            <div className="flex justify-between items-center mb-8">
              <Link to="/expedition" className="p-2 rounded-full bg-white/5 border border-white/10">
                <X className="w-6 h-6" />
              </Link>
              <button 
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-full bg-white/5 border border-white/10"
              >
                <Settings className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <div className="w-24 h-24 rounded-3xl bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] flex items-center justify-center shadow-2xl mb-8">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-3xl font-black mb-4 leading-tight">{lesson.title}</h1>
              <p className="text-slate-400 text-lg mb-10 px-4">{lesson.description}</p>
              
              <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-12">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">XP Reward</p>
                  <p className="text-xl font-black text-yellow-400">+500</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Difficulty</p>
                  <p className="text-xl font-black text-[#43CBFF]">{lesson.difficulty_level || "Easy"}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="w-full bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] py-6 rounded-[2rem] text-xl font-black shadow-[0_10px_30px_rgba(108,99,255,0.4)] transition active:scale-95 mb-8"
            >
              START MISSION
            </button>
          </motion.div>
        )}

        {phase === "active" && (
          <motion.div 
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <AnimatePresence>
              {!isZenMode && (
                <header className="px-6 py-6 border-b border-white/5 flex items-center justify-between backdrop-blur-xl bg-[#16132F]/50">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setShowSettings(true)}
                      className="p-2 rounded-full bg-white/5 border border-white/10"
                    >
                      <Type className="w-4 h-4 text-[#43CBFF]" />
                    </button>
                    <div>
                      <h2 className="text-sm font-black uppercase tracking-widest text-[#43CBFF]">Mission Active</h2>
                      <p className="text-xs text-slate-400 truncate max-w-[150px]">{lesson.title}</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleFinish}
                    className="p-3 rounded-full bg-rose-500/20 text-rose-500 border border-rose-500/30"
                  >
                    <Square className="w-5 h-5 fill-current" />
                  </button>
                </header>
              )}
            </AnimatePresence>

            <div 
              className={`flex-1 overflow-y-auto px-6 space-y-12 transition-all duration-700 ${isZenMode ? "py-32" : "py-10"}`}
              onClick={() => isZenMode && setIsZenMode(false)}
            >
              <div 
                className="space-y-10 font-medium tracking-wide"
                style={{ fontSize: `${fontSize}px`, lineHeight: lineHeight }}
              >
                {(() => {
                  let globalWordIndex = 0;
                  return paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className={`${isZenMode ? "text-white/90" : "text-slate-300"}`}>
                      {paragraph.split(/\s+/).filter(Boolean).map((word) => {
                        const currentIndex = globalWordIndex++;
                        const isActive = currentWordIndex === currentIndex;
                        const isPassed = currentWordIndex > currentIndex;

                        return (
                          <motion.span
                            key={currentIndex}
                            animate={isActive ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                            className={`inline-block rounded-lg px-1.5 transition-all duration-300 ${
                              isActive
                                ? "bg-[#43CBFF] text-slate-900 font-black shadow-[0_0_20px_#43CBFF]"
                                : isPassed
                                ? (isZenMode ? "text-white/20" : "text-white/40")
                                : "text-white"
                            }`}
                          >
                            {word}{" "}
                            {isActive && (
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 2, opacity: 0 }}
                                className="absolute inset-0 bg-[#43CBFF]/40 rounded-full"
                              />
                            )}
                          </motion.span>
                        );
                      })}
                    </p>
                  ));
                })()}
              </div>
            </div>

            <AnimatePresence>
              {!isZenMode && (
                <footer className="p-6 bg-[#16132F]/80 border-t border-white/5 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Progress</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#43CBFF]">
                          {Math.round(((currentWordIndex + 1) / words.length) * 100)}%
                        </span>
                      </div>
                      <div className="h-8 w-px bg-white/10 mx-2" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Focus</span>
                        <div className="flex items-center gap-1">
                          <Activity className="w-3 h-3 text-[#43E97B]" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#43E97B]">Optimal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-[#43CBFF]"
                      animate={{ width: `${((currentWordIndex + 1) / words.length) * 100}%` }}
                    />
                  </div>
                </footer>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {phase === "report" && (
          <motion.div 
            key="report"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col p-6 pt-12"
          >
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-yellow-400/20 flex items-center justify-center shadow-[0_0_50px_rgba(250,204,21,0.2)] mb-8 border border-yellow-400/30">
                <Award className="w-12 h-12 text-yellow-400" />
              </div>
              <h2 className="text-3xl font-black mb-2">Mission Complete!</h2>
              <p className="text-slate-400 mb-10">You've reached a new reading milestone.</p>

              <div className="w-full grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#1E1B4B] rounded-3xl p-6 border border-white/5">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Accuracy</p>
                  <p className="text-4xl font-black text-[#43E97B]">94%</p>
                </div>
                <div className="bg-[#1E1B4B] rounded-3xl p-6 border border-white/5">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Speed</p>
                  <p className="text-4xl font-black text-white">128</p>
                  <p className="text-[10px] font-bold text-slate-500">WPM</p>
                </div>
              </div>

              <div className="w-full bg-[#1E1B4B] rounded-3xl p-6 border border-white/5 mb-8">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Focus Area</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Phonemes", "Diphthongs", "Fluidity"].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs font-bold text-white/70 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/expedition"
              className="w-full bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] py-6 rounded-[2rem] text-xl font-black text-center shadow-[0_10px_30px_rgba(108,99,255,0.4)] mb-8"
            >
              CONTINUE EXPEDITION
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
