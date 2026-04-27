import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Star, Play, Users, X, Info, Target, Zap, Shield, Eye } from "lucide-react";
import toast from "react-hot-toast";

const MISSIONS = [
  { 
    id: "1", name: "Mercury Outpost", level: "Beginner", 
    task: "Letter Inversion Defense", 
    desc: "Defend against b, d, p, and q confusion. Use gravitational stabilizers to fix letter orientation.",
    status: "completed", color: "#FDE68A", icon: Shield
  },
  { 
    id: "2", name: "Venus Station", level: "Intermediate", 
    task: "Phoneme Pulsar", 
    desc: "Match sonic pulses to rapidly moving vowel clusters. High-speed phonetic synchronization required.",
    status: "unlocked", color: "#F97316", icon: Zap
  },
  { 
    id: "3", name: "Earth Base", level: "Intermediate", 
    task: "Reading Anchor", 
    desc: "Stabilize text that 'swims' on the screen. Use focus beams to lock words into a readable sequence.",
    status: "unlocked", color: "#3B82F6", icon: Eye
  },
  { 
    id: "4", name: "Mars Ruins", level: "Advanced", 
    task: "Syllable Splitter", 
    desc: "Deconstruct multi-syllabic ancient texts. Precision slicing of complex word structures.",
    status: "unlocked", color: "#EF4444", icon: Target
  },
  { 
    id: "5", name: "Jupiter Storm", level: "Expert", 
    task: "Context Gravity", 
    desc: "Navigate through missing word gaps. Use surrounding sentence gravity to find the correct meaning.",
    status: "unlocked", color: "#A855F7", icon: Sparkles
  },
  { 
    id: "6", name: "Neptune Abyss", level: "Master", 
    task: "Vowel Abyss", 
    desc: "Locate hidden vowels in zero-visibility environments. Rely on phonetic sonar to complete words.",
    status: "unlocked", color: "#6366F1", icon: Star
  },
];

export const SolarSystemPage = () => {
  const [selectedMission, setSelectedMission] = useState<typeof MISSIONS[0] | null>(null);
  const [isSquadOpen, setIsSquadOpen] = useState(false);

  return (
    <div className="flex flex-col gap-12 p-8 pt-16 pb-40 min-h-screen bg-transparent">
      <header className="relative">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10"
        >
          <h1 className="text-5xl font-[900] text-white leading-[1.1] mb-4 uppercase italic tracking-tighter">
            Mission <br/> <span className="text-[#6C63FF]">Command</span>
          </h1>
          <p className="text-slate-400 font-bold text-lg">Select a sector to deploy.</p>
        </motion.div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#6C63FF] blur-[100px] opacity-20" />
      </header>

      <div className="grid grid-cols-1 gap-8 relative z-10">
        {MISSIONS.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedMission(m)}
            className="group cursor-pointer"
          >
            <div className="bg-[#16132F]/90 backdrop-blur-2xl rounded-[3rem] p-1 border-2 border-white/5 group-hover:border-[#6C63FF]/50 transition-all duration-500 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-6 p-7">
                <div 
                  className="w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-2xl relative transition-transform group-hover:scale-110 duration-500"
                  style={{ background: `linear-gradient(135deg, ${m.color}22 0%, ${m.color}44 100%)`, border: `2px solid ${m.color}66` }}
                >
                  <m.icon className="w-10 h-10" style={{ color: m.color }} />
                  {m.status === "completed" && (
                    <div className="absolute -top-2 -right-2 bg-[#43E97B] rounded-full p-1.5 shadow-lg border-2 border-[#16132F]">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-[900] text-white mb-2 uppercase tracking-tight italic">{m.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-[#43CBFF] uppercase tracking-widest">{m.task}</span>
                  </div>
                </div>
                <div className="p-4 rounded-full bg-white/5 text-slate-500 group-hover:text-white transition">
                  <Info className="w-6 h-6" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Briefing Overlay */}
      <AnimatePresence>
        {selectedMission && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-[#0D0B1E]/95 backdrop-blur-xl p-8 flex flex-col justify-center items-center"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-sm bg-[#16132F] rounded-[4rem] p-10 border-4 border-white/10 shadow-[0_0_100px_rgba(108,99,255,0.3)] relative overflow-hidden text-center"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-[linear-gradient(90deg,transparent,6C63FF,transparent)] animate-pulse" />
              
              <div 
                className="w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl"
                style={{ backgroundColor: `${selectedMission.color}22`, border: `2px solid ${selectedMission.color}` }}
              >
                <selectedMission.icon className="w-12 h-12" style={{ color: selectedMission.color }} />
              </div>

              <h2 className="text-4xl font-[900] text-white mb-4 uppercase italic tracking-tighter">
                {selectedMission.name}
              </h2>
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#43CBFF]/10 border border-[#43CBFF]/20 text-[#43CBFF] text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                {selectedMission.task}
              </div>

              <div className="bg-white/5 rounded-3xl p-6 text-left border border-white/5 mb-10">
                <p className="text-sm font-bold text-slate-400 leading-relaxed">
                  {selectedMission.desc}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <Link 
                  to={`/lesson/${selectedMission.id}`}
                  className="w-full py-6 bg-white text-slate-900 rounded-[2rem] font-black text-xl shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition"
                >
                  START MISSION <Play className="w-5 h-5 fill-current" />
                </Link>
                <button 
                  onClick={() => setSelectedMission(null)}
                  className="w-full py-4 text-slate-500 font-black text-sm uppercase tracking-widest"
                >
                  ABORT COMMAND
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Co-op Squad Rework */}
      <section className="mt-8 relative p-12 rounded-[4rem] bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] text-white shadow-[0_20px_80px_rgba(108,99,255,0.4)] overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-20 rotate-12">
          <Users className="w-40 h-40" />
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl font-[900] mb-4 uppercase italic tracking-tighter">Squad <br/> Portal</h2>
          <p className="font-bold mb-10 opacity-90 max-w-[200px]">3 Explorers waiting for backup.</p>
          <button 
            onClick={() => setIsSquadOpen(true)}
            className="px-10 py-5 bg-[#16132F] text-white rounded-3xl font-black text-lg uppercase tracking-widest shadow-2xl active:scale-90 transition"
          >
            JOIN SQUAD
          </button>
        </div>
      </section>
    </div>
  );
};
