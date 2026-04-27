import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlayCircle, Award, Target, Zap, Star, Flame, BrainCircuit } from "lucide-react";
import { MOCK_STUDENT_PROFILE, MOCK_LESSONS, MOCK_STUDENT_QUESTS } from "../data/mockData";
import { ProgressChart } from "../components/ProgressChart";

export const StudentDashboardPage = () => {
  const profile = MOCK_STUDENT_PROFILE;

  // Level calculation (Mock)
  const currentLevel = 12;
  const xp = 4500;
  const nextLevelXp = 5000;
  const xpPercentage = (xp / nextLevelXp) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Gamified Header Header */}
      <section className="relative overflow-hidden rounded-[3rem] border border-white/5 bg-[#16132F] shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] rounded-full blur-[120px] pointer-events-none opacity-20" />
        
        <div className="relative z-10 p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <div className="relative">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
                <motion.circle 
                  cx="64" cy="64" r="56" fill="none" 
                  stroke="url(#gradient)" strokeWidth="12" 
                  strokeDasharray="351.8" 
                  initial={{ strokeDashoffset: 351.8 }}
                  animate={{ strokeDashoffset: 351.8 - (351.8 * xpPercentage) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round" 
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6C63FF" />
                    <stop offset="100%" stopColor="#43CBFF" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Level</span>
                <span className="text-4xl font-black text-white">{currentLevel}</span>
              </div>
            </div>
            
            <div>
              <h1 className="text-4xl font-extrabold text-white">Welcome back, Alex!</h1>
              <p className="mt-2 text-lg text-slate-400 font-medium">{xp} / {nextLevelXp} XP to Level {currentLevel + 1}</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-4 py-2 rounded-full">
                  <Flame className="w-5 h-5 text-rose-500" />
                  <span className="font-bold text-rose-500">{profile.current_streak} Day Streak</span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 px-4 py-2 rounded-full">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="font-bold text-yellow-400">Master Reader</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link to="/diagnostic" className="flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#A855F7_0%,#3B82F6_100%)] px-8 py-4 text-base font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] transition hover:scale-105 active:scale-[0.98]">
              <BrainCircuit className="w-5 h-5" /> Take Diagnostic
            </Link>
          </div>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.2fr,0.8fr]">
        
        {/* Left Column: Skill Tree / Learning Path */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Target className="w-6 h-6 text-[#43CBFF]" />
              Learning Path
            </h2>
          </div>
          
          <div className="relative rounded-[2.5rem] border border-white/5 bg-[#16132F] p-8 shadow-2xl overflow-hidden min-h-[500px]">
            {/* Mock Path Line */}
            <div className="absolute top-1/2 left-0 w-full h-2 bg-white/5 transform -translate-y-1/2 rounded-full" />
            <motion.div 
              className="absolute top-1/2 left-0 w-1/2 h-2 bg-gradient-to-r from-[#6C63FF] to-[#43CBFF] transform -translate-y-1/2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "50%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />

            <div className="relative z-10 h-full flex items-center justify-between px-4 mt-20">
              {MOCK_LESSONS.slice(0,4).map((lesson, idx) => {
                const isCompleted = idx < 2;
                const isCurrent = idx === 2;
                const isLocked = idx > 2;

                return (
                  <div key={lesson.id} className="flex flex-col items-center relative group">
                    {/* Tooltip */}
                    <div className="absolute -top-32 w-64 bg-[#1E1B4B] border border-white/10 rounded-2xl p-4 shadow-xl opacity-0 group-hover:opacity-100 transition pointer-events-none transform -translate-y-4 group-hover:translate-y-0 z-20">
                      <p className="font-bold text-white mb-1">{lesson.title}</p>
                      <p className="text-xs text-slate-400 line-clamp-2">{lesson.description}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs font-bold text-[#A855F7] bg-white/5 px-2 py-1 rounded">Lvl {lesson.difficulty_level}</span>
                        <span className="text-xs font-bold text-[#43CBFF] bg-white/5 px-2 py-1 rounded">{lesson.category}</span>
                      </div>
                    </div>

                    {/* Node */}
                    <motion.div 
                      whileHover={!isLocked ? { scale: 1.1 } : {}}
                      className={`w-20 h-20 rounded-full flex items-center justify-center border-4 relative z-10 cursor-pointer shadow-lg ${
                        isCompleted ? "bg-[#1E1B4B] border-[#43E97B] text-[#43E97B]" :
                        isCurrent ? "bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] border-transparent text-white shadow-[0_0_30px_rgba(108,99,255,0.6)]" :
                        "bg-[#1E1B4B] border-white/10 text-slate-500 opacity-50"
                      }`}
                    >
                      {isCompleted ? <Star className="w-8 h-8 fill-current" /> :
                       isCurrent ? <PlayCircle className="w-10 h-10" /> :
                       <div className="w-4 h-4 rounded-full bg-slate-500" />}
                    </motion.div>
                    
                    {isCurrent && (
                      <Link 
                        to={`/lesson/${lesson.id}`} 
                        className="mt-6 rounded-full bg-white/10 px-6 py-2 text-sm font-bold text-white hover:bg-white/20 transition whitespace-nowrap"
                      >
                        Start Next
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/5 bg-[#16132F] p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Brain Power Progress</h2>
            <ProgressChart data={profile.recent_sessions} />
          </div>
        </section>

        {/* Right Column: Quests & Stats */}
        <section className="space-y-6">
          <div className="rounded-[2.5rem] border border-white/5 bg-[#16132F] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
              <Zap className="w-5 h-5 text-yellow-400" />
              Daily Quests
            </h2>
            <div className="space-y-5 relative z-10">
              {MOCK_STUDENT_QUESTS.map((quest) => {
                const percent = (quest.progress / quest.total) * 100;
                return (
                  <div key={quest.id} className="bg-[#1E1B4B] border border-white/5 rounded-2xl p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold text-white">{quest.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{quest.description}</p>
                      </div>
                      <span className="text-xs font-black text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">{quest.reward}</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full rounded-full ${percent >= 100 ? "bg-[#43E97B]" : "bg-[linear-gradient(90deg,#6C63FF_0%,#43CBFF_100%)]"}`}
                      />
                    </div>
                    <p className="text-xs font-bold text-slate-400 text-right mt-2">{quest.progress} / {quest.total}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/5 bg-[#16132F] p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Stats Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1E1B4B] border border-white/5 p-5 rounded-2xl text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-[#43CBFF]">Accuracy</p>
                <p className="text-3xl font-black text-white mt-2">{profile.avg_accuracy_pct}%</p>
              </div>
              <div className="bg-[#1E1B4B] border border-white/5 p-5 rounded-2xl text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-[#A855F7]">Speed</p>
                <p className="text-3xl font-black text-white mt-2">{profile.avg_speed_wpm}</p>
              </div>
              <div className="bg-[#1E1B4B] border border-white/5 p-5 rounded-2xl text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-[#43E97B]">Sessions</p>
                <p className="text-3xl font-black text-white mt-2">{profile.total_sessions}</p>
              </div>
              <div className="bg-[#1E1B4B] border border-white/5 p-5 rounded-2xl text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-rose-400">Read Time</p>
                <p className="text-3xl font-black text-white mt-2">{Math.floor(profile.total_minutes_read / 60)}h</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};
