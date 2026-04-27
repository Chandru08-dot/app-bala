import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Star, Lock, Play, Users, X, Info } from "lucide-react";
import toast from "react-hot-toast";

const MISSIONS = [
  { id: "1", name: "Mercury Outpost", level: "Beginner", task: "Frequency Filter", status: "completed", color: "#FDE68A" },
  { id: "2", name: "Venus Station", level: "Intermediate", task: "Mirror Letter Logic", status: "unlocked", color: "#F97316" },
  { id: "3", name: "Earth Base", level: "Intermediate", task: "Vowel Vortex", status: "unlocked", color: "#3B82F6" },
  { id: "4", name: "Mars Ruins", level: "Advanced", task: "Syllable Sniper", status: "unlocked", color: "#EF4444" },
  { id: "5", name: "Jupiter Storm", level: "Expert", task: "Context Navigator", status: "unlocked", color: "#A855F7" },
  { id: "6", name: "Neptune Abyss", level: "Master", task: "Phonological Core", status: "unlocked", color: "#6366F1" },
];

export const SolarSystemPage = () => {
  const [isSquadOpen, setIsSquadOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8 p-6 pt-12 pb-32 min-h-screen bg-transparent overflow-y-auto">
      <header>
        <h1 className="text-4xl font-black text-white leading-tight">Reading Expedition</h1>
        <p className="text-slate-400 font-bold">All sectors are open for exploration</p>
      </header>

      <div className="relative flex flex-col gap-12">
        {/* Central Sun */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,#6C63FF22_0%,transparent_70%)] pointer-events-none" />

        <div className="grid grid-cols-1 gap-6 relative z-10">
          {MISSIONS.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#16132F]/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/5 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition">
                <Star className="w-16 h-16" style={{ color: m.color }} />
              </div>

              <div className="flex items-center gap-6">
                <div 
                  className="w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl relative"
                  style={{ backgroundColor: `${m.color}22`, border: `2px solid ${m.color}` }}
                >
                  <span className="text-2xl">{i + 1}</span>
                  {m.status === "completed" && (
                    <div className="absolute -top-2 -right-2 bg-[#43E97B] rounded-full p-1 shadow-lg">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{m.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{m.level}</span>
                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                    <span className="text-[10px] font-black text-[#43CBFF] uppercase tracking-widest">{m.task}</span>
                  </div>
                </div>
              </div>

              <Link 
                to={`/lesson/${m.id}`}
                className="mt-8 w-full py-4 rounded-2xl bg-white text-slate-900 font-black text-sm flex items-center justify-center gap-2 shadow-xl active:scale-95 transition"
              >
                LAUNCH MISSION <Play className="w-4 h-4 fill-current" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Multi-Player Co-op Quests */}
        <section className="mt-12 p-10 rounded-[3.5rem] bg-[linear-gradient(135deg,#1E1B4B_0%,#0F0D29_100%)] border border-white/5 relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#43CBFF]/10 px-4 py-1.5 mb-6 border border-[#43CBFF]/20">
              <Users className="w-4 h-4 text-[#43CBFF]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#43CBFF]">Multi-Player Quests</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Join Your Squad</h2>
            <p className="text-slate-400 font-bold mb-10 max-w-sm">Collaborative missions are now active! Work with friends to unlock the Omega Gate.</p>
            
            <button 
              onClick={() => setIsSquadOpen(true)}
              className="w-full py-6 rounded-[2.5rem] bg-white text-slate-900 font-black text-lg shadow-2xl hover:scale-105 transition active:scale-95"
            >
              START CO-OP MISSION
            </button>
          </div>
        </section>
      </div>

      {/* Co-op Squad Overlay */}
      <AnimatePresence>
        {isSquadOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-[#0D0B1E] p-8 flex flex-col">
            <header className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-black text-white">Squad Terminal</h2>
              <button onClick={() => setIsSquadOpen(false)} className="p-3 bg-white/5 rounded-full"><X className="w-6 h-6 text-white" /></button>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="w-48 h-48 border-4 border-dashed border-[#6C63FF]/30 rounded-full flex items-center justify-center mb-12">
                <Users className="w-16 h-16 text-[#6C63FF]" />
              </motion.div>
              <h3 className="text-3xl font-black text-white mb-4">Searching for Squad...</h3>
              <p className="text-slate-500 font-bold mb-12">3 friends are online and ready to join.</p>
              
              <div className="flex -space-x-4 mb-12">
                {["🦁", "🦊", "🐨"].map((emoji, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ delay: i * 0.2 }}
                    className="w-16 h-16 rounded-full border-4 border-[#0D0B1E] bg-[#16132F] flex items-center justify-center text-2xl shadow-2xl"
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>

              <button 
                onClick={() => { toast.success("Mission Launching!"); setIsSquadOpen(false); }}
                className="w-full max-w-xs py-6 bg-[#6C63FF] text-white rounded-[2rem] font-black text-xl shadow-xl animate-pulse"
              >
                DEPLOY SQUAD
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
