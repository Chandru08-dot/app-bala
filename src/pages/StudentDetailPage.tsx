import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ChevronLeft, Zap, Clock, Brain, AlertCircle, TrendingUp, ChevronRight, FileText 
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";
import { MOCK_STUDENTS_LIST } from "../data/mockData";

export const StudentDetailPage = () => {
  const { id } = useParams();
  const student = MOCK_STUDENTS_LIST.find(s => s.id === id) || MOCK_STUDENTS_LIST[0];

  const chartData = student.trend.map((val, i) => ({ day: `Day ${i+1}`, accuracy: val }));

  return (
    <div className="flex flex-col gap-8 p-6 pt-12 pb-32 min-h-screen bg-[#0D0B1E]">
      <header className="flex items-center gap-4">
        <Link to="/teacher" className="p-3 rounded-full bg-white/5 border border-white/10 text-white">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-white">{student.name}</h1>
          <p className="text-slate-400 font-bold">Explorer ID: {student.id}</p>
        </div>
      </header>

      {/* Hero Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#16132F] rounded-[2rem] p-6 border border-white/5">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Longest Streak</p>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <p className="text-2xl font-black text-white">14 Days</p>
          </div>
        </div>
        <div className="bg-[#16132F] rounded-[2rem] p-6 border border-white/5">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Total Time</p>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#43CBFF]" />
            <p className="text-2xl font-black text-white">12.5h</p>
          </div>
        </div>
      </div>

      {/* Accuracy Trend Chart */}
      <section className="bg-[#16132F] rounded-[2.5rem] p-8 border border-white/5">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-black text-white">Accuracy Trend</h3>
          <TrendingUp className="w-5 h-5 text-[#43E97B]" />
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#16132F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem' }}
                itemStyle={{ color: '#43CBFF', fontWeight: 900 }}
              />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#6C63FF" 
                strokeWidth={4} 
                dot={{ fill: '#6C63FF', r: 6 }} 
                activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Phonetic Challenges */}
      <section className="bg-[#16132F] rounded-[2.5rem] p-8 border border-white/5">
        <h3 className="text-lg font-black text-white mb-6">Phonetic Challenges</h3>
        <div className="space-y-4">
          {[
            { phoneme: "/th/", status: "Critical", color: "rose-500" },
            { phoneme: "/oo/", status: "Emerging", color: "yellow-400" },
            { phoneme: "/st/", status: "Mastered", color: "43E97B" },
          ].map((item) => (
            <div key={item.phoneme} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-white">
                  {item.phoneme}
                </div>
                <span className="text-sm font-bold text-slate-300">Target Sound</span>
              </div>
              <span className={`text-[10px] font-black uppercase px-2 py-1 rounded bg-${item.color}/10 text-${item.color}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* AI Recommendation */}
      <section className="bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] rounded-[2.5rem] p-8 text-white relative overflow-hidden">
        <div className="flex items-center gap-4 mb-4">
          <Brain className="w-6 h-6" />
          <h3 className="font-black uppercase tracking-tight">AI Teaching Strategy</h3>
        </div>
        <p className="font-bold opacity-90 leading-relaxed">
          Switch {student.name.split(' ')[0]} to "Nebula High-Contrast" theme and increase word spacing. Prioritize multi-syllabic stories next week.
        </p>
      </section>
    </div>
  );
};
