import React from "react";
import { motion } from "framer-motion";
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
  Zap,
  Activity
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

const PROGRESS_DATA = [
  { day: 'Mon', wpm: 35, accuracy: 78 },
  { day: 'Tue', wpm: 38, accuracy: 80 },
  { day: 'Wed', wpm: 42, accuracy: 82 },
  { day: 'Thu', wpm: 40, accuracy: 81 },
  { day: 'Fri', wpm: 48, accuracy: 88 },
  { day: 'Sat', wpm: 52, accuracy: 92 },
  { day: 'Sun', wpm: 55, accuracy: 94 },
];

export const ParentDashboardPage = () => {
  return (
    <div className="flex flex-col gap-8 p-6 pt-12 pb-32 min-h-screen bg-slate-50">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-[900] text-slate-900 tracking-tighter italic">Parent Command</h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Medical-Grade Intelligence</p>
        </div>
        <button className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-400">
          <Settings className="w-6 h-6" />
        </button>
      </header>

      {/* Student Overview */}
      <section className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-20 h-20 rounded-[2rem] bg-blue-600 flex items-center justify-center text-3xl shadow-lg shadow-blue-200">
             👤
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-1">Leo's Progress</h2>
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-emerald-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +18% Improvement
              </span>
              <div className="w-1 h-1 bg-slate-200 rounded-full" />
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Grade 4</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Activity className="w-32 h-32 text-blue-600" />
        </div>
      </section>

      {/* Analytics Tabs Simulation */}
      <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
         <button className="flex-1 py-3 bg-white rounded-xl shadow-sm font-black text-[10px] uppercase text-blue-600 tracking-widest">Fluency</button>
         <button className="flex-1 py-3 text-slate-400 font-black text-[10px] uppercase tracking-widest">Phonetics</button>
         <button className="flex-1 py-3 text-slate-400 font-black text-[10px] uppercase tracking-widest">Attention</button>
      </div>

      {/* Charts */}
      <section className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-black text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-500" /> WPM Progression
          </h3>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Assessment</span>
        </div>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={PROGRESS_DATA}>
              <defs>
                <linearGradient id="colorWpm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="wpm" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorWpm)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Actionable Intelligence */}
      <section className="bg-blue-50 rounded-[3rem] p-8 border border-blue-100">
        <div className="flex items-center gap-3 mb-6 text-blue-600">
          <AlertCircle className="w-6 h-6" />
          <h3 className="font-black text-lg">AI Recommendations</h3>
        </div>
        <div className="space-y-4">
           <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm">
              <p className="text-sm font-bold text-slate-700 leading-relaxed">
                "Leo is struggling with **visual crowding** in multi-syllabic words. Increase line-height to 2.5 during practice sessions."
              </p>
           </div>
           <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm">
              <p className="text-sm font-bold text-slate-700 leading-relaxed">
                "Phonetic accuracy for 'th' sounds has dropped. Schedule a 5-minute Sound Match session."
              </p>
           </div>
        </div>
      </section>

      {/* Teacher Sync */}
      <button className="w-full bg-slate-900 text-white py-7 rounded-[2.5rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl">
        <MessageCircle className="w-6 h-6" /> SYNC WITH TEACHER
      </button>
    </div>
  );
};
