import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Zap, Star, Flame, Check, ChevronRight, Volume2, Users, Target, Activity, Layout, ShoppingBag, Award, Search, Sparkles
} from "lucide-react";
import toast from "react-hot-toast";

export const StudentDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-12 p-8 pt-16 pb-40 min-h-screen bg-transparent">
      {/* Cinematic Profile Header */}
      <header className="flex items-center justify-between">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <h1 className="text-5xl font-[900] text-white leading-[1.1] mb-2 uppercase italic tracking-tighter">
            Hi, <br/> <span className="text-[#43CBFF]">Alex!</span> 👋
          </h1>
          <p className="text-slate-400 font-bold text-lg">Your legacy begins today.</p>
        </motion.div>
        <div className="relative group cursor-pointer" onClick={() => toast("Profile Level: God Mode Active")}>
          <div className="w-24 h-24 rounded-[2.5rem] bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] flex items-center justify-center text-5xl shadow-[0_20px_50px_rgba(108,99,255,0.4)] group-hover:scale-110 transition duration-500">
            🐿️
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 rounded-full border-4 border-[#0D0B1E] flex items-center justify-center shadow-xl">
            <span className="text-xs font-black text-white">1</span>
          </div>
        </div>
      </header>

      {/* Extreme Stats Bar */}
      <div className="grid grid-cols-2 gap-6">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-[#16132F]/90 backdrop-blur-xl rounded-[3rem] p-8 border-2 border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10"><Zap className="w-16 h-16 text-[#43CBFF]" /></div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Total XP</p>
          <p className="text-4xl font-[900] text-white tracking-tighter italic">10.8K</p>
          <div className="h-2 w-full bg-white/5 rounded-full mt-6 overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '70%' }} className="h-full bg-[#43CBFF] shadow-[0_0_15px_rgba(67,203,255,0.8)]" />
          </div>
        </motion.div>
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-[#16132F]/90 backdrop-blur-xl rounded-[3rem] p-8 border-2 border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10"><Star className="w-16 h-16 text-yellow-400" /></div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Rank</p>
          <p className="text-4xl font-[900] text-white tracking-tighter italic">#3</p>
          <p className="text-[10px] font-black text-[#43E97B] mt-4 uppercase tracking-widest">Global Elite</p>
        </motion.div>
      </div>

      {/* Massive Active Mission Card */}
      <section className="relative">
        <div className="flex justify-between items-center mb-6 px-2">
          <h2 className="text-2xl font-[900] text-white uppercase italic tracking-tight">Active Mission</h2>
          <Link to="/expedition" className="text-xs font-black text-[#6C63FF] uppercase tracking-widest">See All</Link>
        </div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/expedition")}
          className="bg-[linear-gradient(135deg,#6C63FF_0%,#A855F7_100%)] rounded-[4rem] p-10 shadow-[0_30px_60px_rgba(108,99,255,0.4)] relative overflow-hidden group cursor-pointer"
        >
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 mb-6 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Priority Mission</span>
            </div>
            <h3 className="text-5xl font-[900] text-white mb-4 uppercase italic tracking-tighter leading-none">The Mars <br/> Vault</h3>
            <p className="text-white/80 font-bold mb-10 text-lg">Target: Syllable Slicing Accuracy</p>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-4">
                {["🐨", "🦁", "🦊", "🐼"].map((e, i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-[#6C63FF] bg-slate-800 flex items-center justify-center text-xl shadow-xl">
                    {e}
                  </div>
                ))}
              </div>
              <div className="bg-white text-slate-900 px-10 py-5 rounded-[2rem] font-[900] text-lg flex items-center gap-3 shadow-2xl group-hover:px-12 transition-all">
                RESUME <ChevronRight className="w-6 h-6 stroke-[3]" />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-[100px] pointer-events-none" />
        </motion.div>
      </section>

      {/* Word of the Day - Cinematic Edition */}
      <section className="bg-[#16132F]/90 backdrop-blur-2xl rounded-[4rem] p-10 border-2 border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-60 h-60 bg-[#43CBFF]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-[#43CBFF]/20 rounded-2xl flex items-center justify-center text-[#43CBFF]">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-tight">Sonic Focus</h3>
        </div>
        <h2 className="text-6xl font-[900] text-white mb-4 tracking-tighter uppercase italic text-[#43CBFF]">Euphoria</h2>
        <p className="text-slate-400 font-bold mb-10 leading-relaxed text-lg">
          A state of intense excitement and happiness. Master this sound to unlock the next sector.
        </p>
        <button 
          onClick={() => toast.success("Recording Voice Telemetry...")}
          className="w-full bg-white/5 hover:bg-white/10 py-6 rounded-[2rem] border-2 border-white/10 font-black text-white flex items-center justify-center gap-3 transition-all active:scale-95"
        >
          <Volume2 className="w-6 h-6 text-[#43CBFF]" /> PRACTICE ENUNCIATION
        </button>
      </section>
    </div>
  );
};
