import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { MOCK_LESSONS } from "../data/mockData";
import { PlayCircle, Square, Award } from "lucide-react";

export const LessonPage = () => {
  const { lessonId } = useParams();
  
  // Use mock data directly
  const lesson = MOCK_LESSONS.find((l) => l.id === lessonId) || MOCK_LESSONS[0];
  const paragraphs = lesson.content.split(/(?<=[.!?])\s+/).filter(Boolean);
  
  const [phase, setPhase] = useState<"landing" | "active" | "processing" | "report">("landing");
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  
  const words = lesson.content.split(/\s+/).filter(Boolean);

  const startTest = () => {
    setPhase("active");
    setIsReading(true);
    setActiveWordIndex(0);
    toast("Reading session started!");
  };

  const stopTest = () => {
    setIsReading(false);
    setPhase("processing");
    
    // Simulate processing delay
    setTimeout(() => {
      setPhase("report");
    }, 2500);
  };

  // Simulate auto-pacer for demo purposes
  useEffect(() => {
    if (phase !== "active" || !isReading) return;
    
    const interval = setInterval(() => {
      setActiveWordIndex((prev) => {
        if (prev >= words.length - 1) {
          stopTest();
          return prev;
        }
        return prev + 1;
      });
    }, 400); // ~150 WPM

    return () => clearInterval(interval);
  }, [phase, isReading, words.length]);

  return (
    <div className="space-y-8">
      {phase === "landing" && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[3rem] bg-[linear-gradient(140deg,#6C63FF_0%,#43CBFF_100%)] p-12 text-white shadow-2xl relative"
        >
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-extrabold leading-tight">
              {lesson.title}
            </h1>
            <p className="mt-6 text-xl font-medium text-white/90">
              {lesson.description}
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startTest}
                className="flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-[#6C63FF] shadow-xl transition"
              >
                <PlayCircle className="w-6 h-6" />
                Start Reading
              </motion.button>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Back
              </Link>
            </div>
          </div>
        </motion.section>
      )}

      {phase === "active" && (
        <section className="fixed inset-0 z-30 flex flex-col bg-[#0D0B1E]">
          <header className="flex flex-col items-center justify-between gap-4 border-b border-white/5 bg-[#16132F]/80 px-6 py-5 backdrop-blur-xl sm:flex-row sm:px-8">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">{lesson.title}</h2>
                <p className="text-sm font-medium tracking-wide text-[#43CBFF]">
                  Reading Session Active
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={stopTest}
                className="flex items-center gap-2 rounded-full bg-rose-500/20 text-rose-500 border border-rose-500/50 px-6 py-2.5 font-bold transition hover:bg-rose-500 hover:text-white"
              >
                <Square className="w-4 h-4 fill-current" /> Finish
              </button>
            </div>
          </header>

          <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-4 py-8 sm:px-6">
            <div className="relative my-auto w-full max-w-5xl rounded-[3.5rem] border border-white/10 bg-[#16132F] px-10 py-20 shadow-2xl sm:px-24 sm:py-32 shrink-0">
              <div className="mx-auto w-full text-center">
                <div className="space-y-14 text-[clamp(1.5rem,2.5vw+1rem,2.8rem)] font-medium leading-[2.5] tracking-wide text-white">
                  {(() => {
                    let globalWordIndex = 0;
                    return paragraphs.map((paragraph, pIndex) => (
                      <p key={pIndex} className="mx-auto text-slate-300">
                        {paragraph.split(/\s+/).filter(Boolean).map((word) => {
                          const currentIndex = globalWordIndex++;
                          const isActive = activeWordIndex === currentIndex;
                          const isPassed = activeWordIndex > currentIndex;

                          return (
                            <span
                              key={currentIndex}
                              className={`inline rounded-2xl px-2.5 py-1.5 transition-all duration-300 ${
                                isActive
                                  ? "bg-[#6C63FF]/20 text-[#43CBFF] shadow-[0_4px_12px_rgba(67,203,255,0.15)] ring-1 ring-[#43CBFF]/50 font-bold"
                                  : isPassed
                                  ? "text-white opacity-80"
                                  : "text-slate-500"
                              }`}
                            >
                              {word}{" "}
                            </span>
                          );
                        })}
                      </p>
                    ));
                  })()}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {phase === "processing" && (
        <section className="flex min-h-[72vh] items-center justify-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-xl rounded-[3rem] border border-white/10 bg-[#16132F]/80 p-12 text-center shadow-2xl backdrop-blur-xl"
          >
            <h2 className="text-4xl font-extrabold text-white">Analyzing Session...</h2>
            <p className="mt-4 text-lg text-slate-400">Calculating speed and accuracy</p>
            <div className="mt-10 h-4 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(90deg,#6C63FF_0%,#43CBFF_100%)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ ease: "easeInOut", duration: 2.5 }}
              />
            </div>
          </motion.div>
        </section>
      )}

      {phase === "report" && (
        <motion.section 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-4xl mx-auto rounded-[3rem] border border-white/10 bg-[#16132F]/80 p-12 shadow-2xl backdrop-blur-xl"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#43E97B]/20 text-[#43E97B] mb-6 shadow-[0_0_30px_rgba(67,233,123,0.3)]">
              <Award className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-extrabold text-white">Session Complete!</h2>
            <p className="mt-4 text-lg text-slate-400">Here's how you did on "{lesson.title}"</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="rounded-[2rem] bg-[#1E1B4B] p-8 text-center border border-white/5">
              <p className="text-sm font-bold uppercase tracking-widest text-[#43CBFF]">Accuracy</p>
              <p className="mt-4 text-5xl font-black text-[#43E97B]">94%</p>
            </div>
            <div className="rounded-[2rem] bg-[#1E1B4B] p-8 text-center border border-white/5">
              <p className="text-sm font-bold uppercase tracking-widest text-[#43CBFF]">Speed</p>
              <p className="mt-4 text-5xl font-black text-white">142 <span className="text-2xl text-slate-500">WPM</span></p>
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              to="/dashboard"
              className="rounded-full bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] px-10 py-5 text-lg font-bold text-white shadow-xl transition hover:scale-105"
            >
              Back to Dashboard
            </Link>
          </div>
        </motion.section>
      )}
    </div>
  );
};
