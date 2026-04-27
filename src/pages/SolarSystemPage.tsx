import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Star, Lock, Play, Users } from "lucide-react";

const MISSIONS = [
  { id: "1", name: "Mercury Outpost", level: "Beginner", status: "completed", color: "#FDE68A" },
  { id: "2", name: "Venus Vault", level: "Beginner", status: "active", color: "#F97316" },
  { id: "3", name: "Earth Station", level: "Intermediate", status: "locked", color: "#3B82F6" },
  { id: "4", name: "Mars Mine", level: "Intermediate", status: "locked", color: "#EF4444" },
  { id: "5", name: "Jupiter Junction", level: "Advanced", status: "locked", color: "#A855F7" },
  { id: "6", name: "Saturn Sphere", level: "Advanced", status: "locked", color: "#F59E0B" },
];

export const SolarSystemPage = () => {
  return (
    <div className="relative min-h-screen bg-[#0D0B1E] overflow-x-hidden pt-10 pb-32">
      {/* Cosmic Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
            }}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
            }}
          />
        ))}
      </div>

      <div className="px-6 relative z-10">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#A855F7]/20 px-4 py-1.5 backdrop-blur-md mb-4 border border-[#A855F7]/30">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">The Reading Galaxy</span>
          </div>
          <h1 className="text-4xl font-black text-white leading-tight">Your Expedition</h1>
          <p className="text-slate-400 mt-2 font-medium">Unlock planets by completing reading missions!</p>
        </header>

        <div className="flex flex-col items-center gap-20">
          {MISSIONS.map((mission, index) => {
            const isEven = index % 2 === 0;
            const isActive = mission.status === "active";
            const isCompleted = mission.status === "completed";
            const isLocked = mission.status === "locked";

            return (
              <div key={mission.id} className={`flex w-full ${isEven ? "justify-start" : "justify-end"} relative`}>
                {/* Connecting Line */}
                {index < MISSIONS.length - 1 && (
                  <div 
                    className="absolute top-full left-1/2 w-0.5 h-20 bg-gradient-to-b from-white/10 to-white/5 -translate-x-1/2" 
                    style={{ transform: `translateX(${isEven ? "-40px" : "40px"}) rotate(${isEven ? "-25deg" : "25deg"})`, top: '80%' }}
                  />
                )}

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`relative group ${isLocked ? "opacity-50" : "opacity-100"}`}
                >
                  {/* Planet Core */}
                  <Link to={isLocked ? "#" : `/lesson/${mission.id}`}>
                    <div 
                      className="w-32 h-32 rounded-full flex items-center justify-center relative z-10 transition-transform group-active:scale-95"
                      style={{ 
                        background: `radial-gradient(circle at 30% 30%, ${mission.color}, ${mission.color}88)`,
                        boxShadow: `0 0 40px ${mission.color}44, inset -10px -10px 20px rgba(0,0,0,0.5)`
                      }}
                    >
                      {isLocked ? (
                        <Lock className="w-8 h-8 text-white/50" />
                      ) : isCompleted ? (
                        <Star className="w-10 h-10 text-white fill-current" />
                      ) : (
                        <Play className="w-10 h-10 text-white fill-current" />
                      )}

                      {/* Orbit Ring */}
                      <div className="absolute inset-[-10px] border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
                    </div>
                  </Link>

                  {/* Label */}
                  <div className={`absolute top-1/2 -translate-y-1/2 ${isEven ? "left-36" : "right-36"} w-40`}>
                    <h3 className="text-xl font-black text-white">{mission.name}</h3>
                    <p className="text-[10px] font-bold text-[#43CBFF] uppercase tracking-widest">{mission.level}</p>
                    {isActive && (
                      <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-yellow-400 px-2 py-0.5 text-[10px] font-black text-slate-900">
                        ACTIVE MISSION
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Multi-Player Co-op Quests */}
        <section className="mt-32 p-10 rounded-[3rem] bg-[linear-gradient(135deg,#1E1B4B_0%,#0F0D29_100%)] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5"><Users className="w-40 h-40" /></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#43CBFF]/10 px-4 py-1.5 mb-6 border border-[#43CBFF]/20">
              <Users className="w-4 h-4 text-[#43CBFF]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#43CBFF]">Multi-Player Quests</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Join Your Squad</h2>
            <p className="text-slate-400 font-bold mb-10 max-w-sm">Work together with Class 4B to unlock the Andromeda Gate!</p>
            
            <div className="flex -space-x-4 mb-10">
              {["🦁", "🦊", "🐼", "🐨", "🐸"].map((emoji, i) => (
                <div key={i} className="w-14 h-14 rounded-full border-4 border-[#0F0D29] bg-white/5 flex items-center justify-center text-2xl shadow-xl relative group">
                  {emoji}
                  <div className="absolute -bottom-2 bg-[#43CBFF] px-2 py-0.5 rounded text-[8px] font-black text-slate-900 opacity-0 group-hover:opacity-100 transition">ON MARS</div>
                </div>
              ))}
              <div className="w-14 h-14 rounded-full border-4 border-[#0F0D29] bg-white/10 backdrop-blur-md flex items-center justify-center text-xs font-black text-white">
                +12
              </div>
            </div>

            <button className="w-full py-6 rounded-[2rem] bg-white text-slate-900 font-black text-lg shadow-2xl hover:scale-105 transition active:scale-95">
              START CO-OP MISSION
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
