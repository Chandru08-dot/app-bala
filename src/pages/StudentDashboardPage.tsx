import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Activity, 
  Clock, 
  Award, 
  ChevronRight, 
  Play,
  CheckCircle2,
  AlertCircle
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

const PERFORMANCE_DATA = [
  { day: 'Mon', wpm: 45, accuracy: 82 },
  { day: 'Tue', wpm: 48, accuracy: 85 },
  { day: 'Wed', wpm: 42, accuracy: 80 },
  { day: 'Thu', wpm: 52, accuracy: 88 },
  { day: 'Fri', wpm: 55, accuracy: 92 },
  { day: 'Sat', wpm: 58, accuracy: 90 },
  { day: 'Sun', wpm: 62, accuracy: 94 },
];

export const StudentDashboardPage = () => {
  return (
    <div className="flex flex-col gap-8 p-6 pt-12 pb-32 bg-slate-50 min-h-screen">
      {/* Profile Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[900] text-slate-900 tracking-tight">Student Hub</h1>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Alex Johnson • Grade 4</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm border border-blue-200">
          <Award className="w-6 h-6" />
        </div>
      </header>

      {/* Quick Diagnostic Status */}
      <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-slate-900">Diagnostic Status</h3>
            <p className="text-xs font-bold text-slate-400">Next Assessment: 12 May</p>
          </div>
        </div>
        <div className="flex justify-between items-center bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <div className="text-center flex-1">
            <p className="text-xs font-black text-slate-400 uppercase">Fluency</p>
            <p className="text-lg font-black text-slate-900">High</p>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-center flex-1">
            <p className="text-xs font-black text-slate-400 uppercase">Phonemes</p>
            <p className="text-lg font-black text-slate-900">88%</p>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-center flex-1">
            <p className="text-xs font-black text-slate-400 uppercase">Focus</p>
            <p className="text-lg font-black text-slate-900">92%</p>
          </div>
        </div>
      </section>

      {/* Accuracy Analytics */}
      <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-black text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" /> Accuracy Trend
          </h3>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">7 Day Metrics</span>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={PERFORMANCE_DATA}>
              <defs>
                <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAcc)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Recommended Session */}
      <section className="relative">
        <motion.div 
          whileTap={{ scale: 0.98 }}
          className="bg-blue-600 rounded-[3rem] p-10 text-white shadow-xl shadow-blue-200 relative overflow-hidden group cursor-pointer"
        >
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-80">Recommended Session</p>
            <h3 className="text-4xl font-[900] mb-2 italic tracking-tighter">Vowel <br/> Mastering</h3>
            <p className="text-blue-100 font-bold mb-10 text-lg opacity-90">Targeting 'ou' and 'ow' sounds</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-md">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-black uppercase">12 MINS</span>
              </div>
              <div className="bg-white text-blue-600 px-10 py-5 rounded-[2rem] font-black text-lg flex items-center gap-3 shadow-2xl group-hover:px-12 transition-all">
                START <Play className="w-6 h-6 fill-current" />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-[80px]" />
        </motion.div>
      </section>

      {/* Recent Difficulties */}
      <section className="bg-rose-50 rounded-[2.5rem] p-8 border border-rose-100">
        <div className="flex items-center gap-3 mb-6 text-rose-600">
          <AlertCircle className="w-6 h-6" />
          <h3 className="font-black text-lg">Focus Areas</h3>
        </div>
        <div className="space-y-4">
          {["Pneumonia", "Beautiful", "Knowledge"].map((word, i) => (
            <div key={i} className="flex justify-between items-center bg-white rounded-2xl p-4 border border-rose-100 shadow-sm">
              <span className="font-black text-slate-800">{word}</span>
              <ChevronRight className="w-5 h-5 text-rose-300" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
