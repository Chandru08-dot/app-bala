import React from "react";
import { motion } from "framer-motion";
import { Award, Star, Zap, Flame, Trophy, Lock } from "lucide-react";

const BADGES = [
  { id: 1, name: "Fast Scurrier", desc: "Read 150 WPM", icon: Zap, color: "#43CBFF", earned: true },
  { id: 2, name: "Eagle Eye", desc: "100% Accuracy in a session", icon: Star, color: "#FDE68A", earned: true },
  { id: 3, name: "Daily Climber", desc: "7 Day Streak", icon: Flame, color: "#F97316", earned: true },
  { id: 4, name: "Galaxy Hero", desc: "Complete 10 Missions", icon: Trophy, color: "#A855F7", earned: false },
  { id: 5, name: "Phoneme Master", desc: "Master 50 Phonemes", icon: Award, color: "#43E97B", earned: false },
];

export const AchievementsPage = () => {
  return (
    <div className="flex flex-col gap-8 p-6 pt-12 pb-32">
      <header>
        <h1 className="text-3xl font-black text-white">Your Trophies</h1>
        <p className="text-slate-400 font-bold">You've earned 3 out of 10 badges!</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {BADGES.map((badge) => (
          <motion.div 
            key={badge.id}
            whileHover={{ scale: 1.05 }}
            className={`relative rounded-[2rem] p-6 border border-white/5 text-center flex flex-col items-center ${
              badge.earned ? "bg-[#16132F]" : "bg-[#16132F]/40 grayscale opacity-60"
            }`}
          >
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
              style={{ backgroundColor: `${badge.color}22`, color: badge.color }}
            >
              <badge.icon className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-black text-white mb-1">{badge.name}</h3>
            <p className="text-[10px] font-bold text-slate-500 leading-tight">{badge.desc}</p>
            
            {!badge.earned && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-[2rem] backdrop-blur-[2px]">
                <Lock className="w-6 h-6 text-white/50" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <section className="mt-4 bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] rounded-[2rem] p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-black mb-2">Next Milestone</h2>
          <p className="text-sm font-bold opacity-90 mb-4">Complete 2 more missions to unlock "Galaxy Hero"</p>
          <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden">
            <div className="h-full bg-white w-[80%]" />
          </div>
        </div>
        <Trophy className="absolute -bottom-4 -right-4 w-32 h-32 opacity-20 rotate-12" />
      </section>
    </div>
  );
};
