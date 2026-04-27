import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Star, Crown, ChevronRight, Zap, Target, Shield } from "lucide-react";
import toast from "react-hot-toast";

const ACHIEVEMENTS = [
  { id: 1, name: "Sound Master", desc: "Recognize 100 phonemes", progress: 85, icon: Zap, color: "#FDE68A" },
  { id: 2, name: "Earth Stabilizer", desc: "Complete 5 missions on Earth", progress: 100, icon: Shield, color: "#3B82F6" },
  { id: 3, name: "Syllable Slicer", desc: "Break 50 multi-syllabic words", progress: 40, icon: Target, color: "#EF4444" },
];

const LEADERBOARD = [
  { rank: 1, name: "Xenon_Reader", score: "12,450", avatar: "🤖" },
  { rank: 2, name: "Nebula_Fox", score: "11,820", avatar: "🦊" },
  { rank: 3, name: "Leo_Explorer", score: "10,950", avatar: "🐨" },
  { rank: 4, name: "Star_Gazer", score: "9,200", avatar: "🐼" },
];

export const HallOfFamePage = () => {
  const [view, setView] = useState<"achievements" | "leaderboard">("achievements");

  return (
    <div className="flex flex-col gap-10 p-8 pt-16 pb-40 min-h-screen bg-transparent">
      <header className="relative">
        <h1 className="text-5xl font-[900] text-white leading-[1.1] mb-2 uppercase italic tracking-tighter">
          Hall of <br/> <span className="text-yellow-400">Fame</span>
        </h1>
        <p className="text-slate-400 font-bold text-lg">Your galactic legacy.</p>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400 blur-[100px] opacity-10" />
      </header>

      {/* View Toggles */}
      <div className="flex gap-4 p-2 bg-white/5 rounded-[2rem] border border-white/10">
        <button 
          onClick={() => setView("achievements")}
          className={`flex-1 py-4 rounded-[1.5rem] font-[900] text-xs uppercase tracking-widest transition ${view === "achievements" ? "bg-white text-slate-900 shadow-xl" : "text-slate-500"}`}
        >
          Awards
        </button>
        <button 
          onClick={() => setView("leaderboard")}
          className={`flex-1 py-4 rounded-[1.5rem] font-[900] text-xs uppercase tracking-widest transition ${view === "leaderboard" ? "bg-white text-slate-900 shadow-xl" : "text-slate-500"}`}
        >
          Ranking
        </button>
      </div>

      <AnimatePresence mode="wait">
        {view === "achievements" ? (
          <motion.div 
            key="achievements"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            {ACHIEVEMENTS.map((a, i) => (
              <motion.div 
                key={a.id}
                whileTap={{ scale: 0.98 }}
                className="bg-[#16132F]/90 backdrop-blur-xl rounded-[3rem] p-8 border-2 border-white/5 relative overflow-hidden group"
              >
                <div className="flex items-center gap-6 mb-6">
                  <div 
                    className="w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl relative transition-transform group-hover:rotate-12"
                    style={{ backgroundColor: `${a.color}22`, border: `2px solid ${a.color}66` }}
                  >
                    <a.icon className="w-8 h-8" style={{ color: a.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-white">{a.name}</h3>
                    <p className="text-xs text-slate-500 font-bold leading-relaxed">{a.desc}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase">
                    <span>Progress</span>
                    <span style={{ color: a.color }}>{a.progress}%</span>
                  </div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${a.progress}%` }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: a.color }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="leaderboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {LEADERBOARD.map((p, i) => (
              <div 
                key={p.rank}
                className={`bg-[#16132F]/80 backdrop-blur-xl rounded-3xl p-6 border-2 flex items-center gap-6 ${p.rank === 3 ? "border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.2)]" : "border-white/5"}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black ${p.rank === 1 ? "bg-yellow-400 text-slate-900" : "bg-white/5 text-slate-500"}`}>
                  {p.rank === 1 ? <Crown className="w-6 h-6" /> : p.rank}
                </div>
                <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-2xl shadow-xl">
                  {p.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-black text-white">{p.name}</h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{p.score} pts</p>
                </div>
                {p.rank === 3 && (
                   <span className="text-[10px] font-black bg-yellow-400 text-slate-900 px-3 py-1 rounded-full">YOU</span>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <section className="bg-white/5 border-2 border-dashed border-white/10 rounded-[3rem] p-10 text-center">
        <Medal className="w-16 h-16 text-slate-700 mx-auto mb-6" />
        <h3 className="text-xl font-black text-slate-400 mb-2">Secret Rewards</h3>
        <p className="text-xs text-slate-600 font-bold uppercase tracking-[0.2em]">Unlock all planet trophies to reveal</p>
      </section>
    </div>
  );
};
