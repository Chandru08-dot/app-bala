import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Zap, Star, Flame, Check, ChevronRight, Volume2, Users, Target, Activity, Layout, ShoppingBag, Award
} from "lucide-react";
import { MOCK_STUDENT_PROFILE, MOCK_STUDENT_QUESTS } from "../data/mockData";

export const StudentDashboardPage = () => {
  const navigate = useNavigate();
  const profile = MOCK_STUDENT_PROFILE;

  return (
    <div className="flex flex-col gap-8 p-6 pt-12 pb-32">
      {/* Profile Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Hi, Alex! 👋</h1>
          <p className="text-slate-400 font-bold">Ready for today's mission?</p>
        </div>
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] flex items-center justify-center text-2xl shadow-xl">
            🐿️
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full border-4 border-[#0D0B1E] flex items-center justify-center">
            <span className="text-[10px] font-black text-white">1</span>
          </div>
        </div>
      </header>

      {/* Stats Quick View */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#16132F] rounded-[2rem] p-5 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10"><Zap className="w-12 h-12" /></div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Current XP</p>
          <p className="text-2xl font-black text-white">10,800</p>
          <div className="h-1.5 w-full bg-white/5 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-[#43CBFF] w-[70%]" />
          </div>
        </div>
        <div className="bg-[#16132F] rounded-[2rem] p-5 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10"><Star className="w-12 h-12" /></div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Rank</p>
          <p className="text-2xl font-black text-white">#3</p>
          <p className="text-[10px] font-bold text-[#43E97B] mt-1">+12 spots this week</p>
        </div>
      </div>

      {/* Word of the Day */}
      <section className="bg-[linear-gradient(135deg,#1E1B4B_0%,#0F0D29_100%)] rounded-[2.5rem] p-8 border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#43CBFF]/10 rounded-full blur-3xl" />
        <div className="flex items-center gap-3 mb-4">
          <div className="px-3 py-1 bg-[#43CBFF]/20 rounded-full">
            <span className="text-[10px] font-black text-[#43CBFF] uppercase tracking-widest">Word of the Day</span>
          </div>
        </div>
        <h2 className="text-4xl font-black text-white mb-2 tracking-tight uppercase">Euphoria</h2>
        <p className="text-sm text-slate-400 font-bold mb-6 italic">/juːˈfɔːriə/</p>
        <p className="text-slate-300 text-sm leading-relaxed mb-8">
          A feeling or state of intense excitement and happiness.
        </p>
        <button className="w-full bg-white/5 hover:bg-white/10 py-4 rounded-2xl border border-white/10 font-black text-white flex items-center justify-center gap-2 transition">
          <Volume2 className="w-5 h-5 text-[#43CBFF]" /> LISTEN & PRACTICE
        </button>
      </section>

      {/* Daily Streak Calendar */}
      <section className="bg-[#16132F] rounded-[2.5rem] p-8 border border-white/5">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-black text-white">Mission Streak</h3>
            <p className="text-xs text-slate-500 font-bold">You're on a 5-day streak!</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 rounded-full text-rose-500 border border-rose-500/20">
            <Flame className="w-5 h-5" />
            <span className="font-black">5</span>
          </div>
        </div>
        <div className="flex justify-between gap-2">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <span className="text-[10px] font-bold text-slate-500">{day}</span>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                i < 5 ? "bg-[#43E97B] text-[#0D0B1E]" : "bg-white/5 text-slate-700 border border-white/5"
              }`}>
                {i < 5 ? <Check className="w-6 h-6" /> : <div className="w-2 h-2 bg-slate-700 rounded-full" />}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Active Mission Card */}
      <section className="relative">
        <h2 className="text-lg font-black text-white mb-4 px-2">Active Mission</h2>
        <div 
          onClick={() => navigate("/expedition")}
          className="bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] rounded-[2.5rem] p-8 shadow-[0_20px_40px_rgba(108,99,255,0.3)] relative overflow-hidden group cursor-pointer active:scale-95 transition-transform"
        >
          <div className="relative z-10">
            <h3 className="text-2xl font-black text-white mb-2">The Mars Vault</h3>
            <p className="text-white/80 font-bold mb-8 text-sm">Target: Multi-syllabic fluency</p>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-[#6C63FF] bg-slate-800 flex items-center justify-center text-xs">
                    {["🦁", "🦊", "🐼"][i-1]}
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-4 border-[#6C63FF] bg-white/10 backdrop-blur-md flex items-center justify-center text-[10px] font-black">
                  +12
                </div>
              </div>
              <div className="bg-white text-slate-900 px-6 py-3 rounded-full font-black text-sm flex items-center gap-2 group-hover:px-8 transition-all">
                RESUME <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
        </div>
      </section>

      {/* Class Progress */}
      <section className="bg-[#16132F] rounded-[2.5rem] p-8 border border-white/5">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-[#A855F7]/10 rounded-xl text-[#A855F7]">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-white">Class 4B Goal</h3>
            <p className="text-xs text-slate-500">Collect 50,000 XP together</p>
          </div>
        </div>
        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden mb-3">
          <div className="h-full bg-[#A855F7] w-[65%]" />
        </div>
        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <span>32,500 XP</span>
          <span>50,000 XP</span>
        </div>
      </section>
    </div>
  );
};
