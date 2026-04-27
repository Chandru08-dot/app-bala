import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlayCircle, Award, Target, Zap, Star, Flame, BrainCircuit, ChevronRight } from "lucide-react";
import { MOCK_STUDENT_PROFILE, MOCK_LESSONS, MOCK_STUDENT_QUESTS } from "../data/mockData";
import { ProgressChart } from "../components/ProgressChart";

export const StudentDashboardPage = () => {
  const profile = MOCK_STUDENT_PROFILE;
  const currentLevel = 12;
  const xp = 4500;
  const nextLevelXp = 5000;
  const xpPercentage = (xp / nextLevelXp) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6 p-4 pt-8"
    >
      {/* Mini Profile Header */}
      <section className="flex items-center justify-between px-2">
        <div>
          <h1 className="text-2xl font-black text-white">Hey, Alex! 👋</h1>
          <p className="text-slate-400 text-sm font-bold">Explorer Level {currentLevel}</p>
        </div>
        <div className="flex -space-x-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0D0B1E] bg-slate-800" />
          ))}
        </div>
      </section>

      {/* Level Card */}
      <section className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] p-6 shadow-xl">
        <div className="relative z-10 flex items-center gap-6">
          <div className="relative shrink-0">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
              <motion.circle 
                cx="40" cy="40" r="36" fill="none" 
                stroke="white" strokeWidth="6" 
                strokeDasharray="226.2" 
                initial={{ strokeDashoffset: 226.2 }}
                animate={{ strokeDashoffset: 226.2 - (226.2 * xpPercentage) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round" 
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-black text-white">{currentLevel}</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">Next Level</span>
              <span className="text-xs font-black text-white">{xp} / {nextLevelXp} XP</span>
            </div>
            <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${xpPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#16132F] rounded-[1.5rem] p-4 border border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
            <Flame className="w-5 h-5 text-rose-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase">Streak</p>
            <p className="text-lg font-black text-white">{profile.current_streak} Days</p>
          </div>
        </div>
        <div className="bg-[#16132F] rounded-[1.5rem] p-4 border border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center">
            <Star className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase">Rank</p>
            <p className="text-lg font-black text-white">Elite</p>
          </div>
        </div>
      </div>

      {/* Active Mission Card */}
      <section className="bg-[#16132F] rounded-[2rem] p-6 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#43CBFF]/5 rounded-full blur-2xl" />
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-[#43CBFF]" />
            Active Mission
          </h2>
          <Link to="/expedition" className="text-[10px] font-black text-[#43CBFF] uppercase tracking-widest">See Map</Link>
        </div>
        
        <div className="flex items-center gap-4 bg-[#1E1B4B] p-4 rounded-2xl border border-white/5">
          <div className="w-12 h-12 rounded-xl bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] flex items-center justify-center shadow-lg">
            <PlayCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-slate-400">Mission 02</p>
            <p className="font-black text-white text-sm">The Venus Vault</p>
          </div>
          <Link to="/lesson/2" className="p-2 rounded-full bg-white/5 text-white">
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Daily Quests */}
      <section className="bg-[#16132F] rounded-[2rem] p-6 border border-white/5">
        <h2 className="text-lg font-black text-white mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Daily Quests
        </h2>
        <div className="space-y-4">
          {MOCK_STUDENT_QUESTS.slice(0, 2).map((quest) => {
            const percent = (quest.progress / quest.total) * 100;
            return (
              <div key={quest.id} className="bg-white/5 rounded-2xl p-4">
                <div className="flex justify-between mb-2">
                  <p className="text-xs font-bold text-white">{quest.title}</p>
                  <span className="text-[10px] font-black text-yellow-400">+{quest.reward}</span>
                </div>
                <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    className="h-full bg-yellow-400"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="bg-[#16132F] rounded-[2rem] p-6 border border-white/5 mb-6">
        <h2 className="text-lg font-black text-white mb-6">Your Progress</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 p-4 rounded-2xl">
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Accuracy</p>
            <p className="text-2xl font-black text-white">{profile.avg_accuracy_pct}%</p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl">
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Speed</p>
            <p className="text-2xl font-black text-white">{profile.avg_speed_wpm} <span className="text-[10px] text-slate-500">WPM</span></p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
