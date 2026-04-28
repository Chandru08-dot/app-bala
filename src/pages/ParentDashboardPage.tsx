import React from "react";
import { Link } from "react-router-dom";
import { Heart, Activity, Clock, ChevronRight, User, GraduationCap, Zap } from "lucide-react";
import { MOCK_USER, MOCK_STUDENTS } from "../data/mockData";

export const ParentDashboardPage = () => {
  const parent = MOCK_USER.parent;
  // Let's pretend the parent has two kids, just use the first two students
  const children = MOCK_STUDENTS.slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <Heart className="w-8 h-8 text-rose-500" />
          Welcome, {parent.name.split(' ')[0]}
        </h1>
        <p className="text-slate-500 font-medium mt-2">Here is a quick overview of how your explorers are doing this week.</p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-black text-slate-900 ml-2">Your Explorers</h2>
        
        {children.map(child => (
          <div key={child.student_id} className="card p-6 bg-white hover:border-indigo-200 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-sky-100 rounded-[1.5rem] flex items-center justify-center border border-indigo-50">
                  <User className="w-8 h-8 text-indigo-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">{child.name}</h3>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{child.reading_level}</p>
                </div>
              </div>
              <Link to={`/student/${child.student_id}`} className="btn-secondary flex items-center justify-center gap-2">
                Detailed Progress <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex flex-col items-center justify-center text-center">
                <Activity className="w-5 h-5 text-emerald-500 mb-1" />
                <span className="text-xl font-black text-slate-900">{child.avg_accuracy_pct}%</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Accuracy</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <Zap className="w-5 h-5 text-amber-500 mb-1" />
                <span className="text-xl font-black text-slate-900">{child.avg_speed_wpm}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Speed (WPM)</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <GraduationCap className="w-5 h-5 text-sky-500 mb-1" />
                <span className="text-xl font-black text-slate-900">{child.attention_score}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Focus Score</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center">
                <Clock className="w-5 h-5 text-indigo-500 mb-1" />
                <span className="text-xl font-black text-slate-900">{child.recent_sessions}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sessions</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-8 bg-gradient-to-br from-indigo-600 to-sky-600 text-white shadow-lg border-0">
        <h3 className="text-xl font-black mb-2">Teacher Notes</h3>
        <p className="text-indigo-100 text-sm font-medium leading-relaxed mb-4">
          "Alex has shown incredible progress with multi-syllable words this week! We are focusing on steady pacing for the next set of quests." - Mrs. Sarah Davis
        </p>
        <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition-colors">
          Reply to Teacher
        </button>
      </div>
    </div>
  );
};
