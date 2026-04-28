import React from "react";
import { TrendingUp, Award, BookOpen, Target, Clock, Zap } from "lucide-react";
import { MOCK_USER } from "../data/mockData";

export const ProgressPage = () => {
  const student = MOCK_USER.student;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your Progress</h1>
          <p className="text-slate-500 font-bold mt-1">Track your reading stats and growth over time.</p>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-6 border-l-4 border-indigo-500 flex flex-col justify-center">
          <BookOpen className="w-6 h-6 text-indigo-500 mb-2" />
          <h3 className="text-2xl font-black text-slate-900">{student.recent_sessions}</h3>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Sessions</p>
        </div>
        <div className="card p-6 border-l-4 border-amber-500 flex flex-col justify-center">
          <Award className="w-6 h-6 text-amber-500 mb-2" />
          <h3 className="text-2xl font-black text-slate-900">124</h3>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Mastered Words</p>
        </div>
        <div className="card p-6 border-l-4 border-emerald-500 flex flex-col justify-center">
          <Target className="w-6 h-6 text-emerald-500 mb-2" />
          <h3 className="text-2xl font-black text-slate-900">{student.avg_accuracy_pct}%</h3>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Avg Accuracy</p>
        </div>
        <div className="card p-6 border-l-4 border-sky-500 flex flex-col justify-center">
          <TrendingUp className="w-6 h-6 text-sky-500 mb-2" />
          <h3 className="text-2xl font-black text-slate-900">{student.reading_level}</h3>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Reading Level</p>
        </div>
      </div>

      {/* Growth Graph Simulation */}
      <div className="card p-8">
        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-500" />
          Accuracy History
        </h2>
        
        {/* CSS-only Bar Chart Simulation */}
        <div className="h-64 flex items-end justify-between gap-2 border-b-2 border-slate-100 pb-4">
          {[75, 78, 80, 85, 82, 88, 90, 89, 92, 94].map((height, i) => (
            <div key={i} className="w-full flex flex-col items-center gap-2 group">
              <div 
                className="w-full bg-indigo-100 rounded-t-lg relative group-hover:bg-indigo-200 transition-colors"
                style={{ height: `${height}%` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {height}%
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-400">W{i+1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Focus and Consistency */}
      <div>
        <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          Focus & Consistency
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">7 Days</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Current Streak</p>
            </div>
          </div>
          <div className="card p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center">
              <Target className="w-6 h-6 text-sky-500" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">{student.attention_score}</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Attention Score</p>
            </div>
          </div>
          <div className="card p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-indigo-500" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">14h 20m</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Reading Time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
