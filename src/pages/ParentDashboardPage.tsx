import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  AlertCircle, 
  MessageCircle, 
  Send, 
  Settings,
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import toast from "react-hot-toast";

const ACCURACY_DATA = [
  { day: 'Mon', accuracy: 65 },
  { day: 'Tue', accuracy: 68 },
  { day: 'Wed', accuracy: 75 },
  { day: 'Thu', accuracy: 72 },
  { day: 'Fri', accuracy: 82 },
  { day: 'Sat', accuracy: 85 },
  { day: 'Sun', accuracy: 88 },
];

const RECENT_MISTAKES = [
  { word: "Beautiful", type: "Vowel Substitution", date: "10m ago" },
  { word: "Through", type: "Letter Transposition", date: "1h ago" },
  { word: "Knowledge", type: "Silent Letter Omission", date: "3h ago" },
];

export const ParentDashboardPage = () => {
  const [activeTab, setActiveTab] = useState<"stats" | "chat" | "goals">("stats");
  const [msg, setMsg] = useState("");

  const sendMessage = () => {
    if (!msg.trim()) return;
    toast.success("Message sent to Teacher Thompson!");
    setMsg("");
  };

  return (
    <div className="flex flex-col gap-8 p-6 pt-12 pb-32 min-h-screen bg-transparent">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white">Parent Portal</h1>
          <p className="text-slate-400 font-bold">Synchronized with Teacher Thompson</p>
        </div>
        <button className="p-3 bg-white/5 rounded-full border border-white/10 text-white">
          <Settings className="w-6 h-6" />
        </button>
      </header>

      {/* Profile Overview */}
      <div className="bg-[#16132F]/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/5 flex items-center gap-6 shadow-2xl">
        <div className="w-20 h-20 rounded-3xl bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] flex items-center justify-center text-3xl shadow-xl">
          🦊
        </div>
        <div>
          <h2 className="text-2xl font-black text-white mb-1">Leo's Journey</h2>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#43E97B] flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12% this week
            </span>
            <div className="w-1 h-1 bg-white/20 rounded-full" />
            <span className="text-xs font-bold text-slate-500">Level 4 Explorer</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white/5 p-2 rounded-2xl">
        {(["stats", "chat", "goals"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition ${
              activeTab === tab ? "bg-white text-slate-900 shadow-lg" : "text-slate-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "stats" && (
          <motion.div 
            key="stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Accuracy Chart */}
            <div className="bg-[#16132F]/50 rounded-[2.5rem] p-8 border border-white/5">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-black text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#6C63FF]" /> Accuracy Trend
                </h3>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Last 7 Days</span>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ACCURACY_DATA}>
                    <defs>
                      <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6C63FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="accuracy" stroke="#6C63FF" strokeWidth={4} fillOpacity={1} fill="url(#colorAcc)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#16132F]/50 rounded-[2rem] p-6 border border-white/5">
                <Clock className="w-5 h-5 text-[#43CBFF] mb-3" />
                <p className="text-2xl font-black text-white">42m</p>
                <p className="text-[10px] font-black text-slate-500 uppercase">Avg. Daily Reading</p>
              </div>
              <div className="bg-[#16132F]/50 rounded-[2rem] p-6 border border-white/5">
                <Zap className="w-5 h-5 text-yellow-400 mb-3" />
                <p className="text-2xl font-black text-white">1,240</p>
                <p className="text-[10px] font-black text-slate-500 uppercase">Words Processed</p>
              </div>
            </div>

            {/* Critical Focus Areas */}
            <div className="bg-rose-500/10 rounded-[2.5rem] p-8 border border-rose-500/20">
              <div className="flex items-center gap-3 mb-6 text-rose-500">
                <AlertCircle className="w-6 h-6" />
                <h3 className="font-black">Critical Focus: Vowels</h3>
              </div>
              <div className="space-y-4">
                {RECENT_MISTAKES.map((m, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-rose-500/10 pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="text-white font-black">{m.word}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">{m.type}</p>
                    </div>
                    <span className="text-[10px] text-slate-600 font-bold">{m.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "chat" && (
          <motion.div 
            key="chat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col h-[500px]"
          >
            <div className="flex-1 bg-[#16132F]/50 rounded-t-[2.5rem] p-8 overflow-y-auto space-y-6">
              <div className="flex gap-4 max-w-[80%]">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">👩‍🏫</div>
                <div className="bg-slate-800 rounded-3xl rounded-tl-none p-4 text-sm text-slate-300">
                  Hi Leo's parent! I noticed he's doing great with silent letters. I've assigned a new vowel challenge for him.
                </div>
              </div>
              <div className="flex gap-4 max-w-[80%] ml-auto flex-row-reverse">
                <div className="w-10 h-10 rounded-full bg-[#6C63FF] flex items-center justify-center shrink-0">👤</div>
                <div className="bg-[#6C63FF] rounded-3xl rounded-tr-none p-4 text-sm text-white">
                  Thanks for the update! He's really enjoying the space theme.
                </div>
              </div>
            </div>
            <div className="bg-[#16132F] rounded-b-[2.5rem] p-4 flex gap-4 border-t border-white/5">
              <input 
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Message teacher..."
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 text-sm text-white focus:outline-none focus:border-[#6C63FF] transition"
              />
              <button 
                onClick={sendMessage}
                className="w-12 h-12 bg-[#6C63FF] rounded-2xl flex items-center justify-center text-white active:scale-90 transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === "goals" && (
          <motion.div key="goals" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
             <div className="bg-[#16132F]/50 rounded-[2rem] p-8 border border-white/5 flex items-center justify-between group cursor-pointer hover:border-[#6C63FF] transition">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#6C63FF]/20 flex items-center justify-center text-[#6C63FF]">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-white font-black">Accuracy Goal</h4>
                    <p className="text-xs text-slate-500">Maintain 85% for 3 days</p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-[#6C63FF] transition" />
             </div>
             {/* Add more goal items similarly */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
