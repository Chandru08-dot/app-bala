import React from "react";
import { Link } from "react-router-dom";
import { Flame, Target, Trophy, Play, Star, Zap, ChevronRight, Compass, BookOpen } from "lucide-react";
import { MOCK_USER, MOCK_LESSONS, MOCK_SESSIONS } from "../data/mockData";

export const StudentDashboardPage = () => {
  const student = MOCK_USER.student;

  return (
    <div className="space-y-6 px-4 pt-6 animate-in fade-in duration-500 pb-8">
      {/* Top Bar Area */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-[1.2rem] shadow-sm flex items-center justify-center border border-slate-100 overflow-hidden">
            <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${student.name}&backgroundColor=6366f1`} alt="Avatar" className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">
              Hi, {student.name.split(' ')[0]}!
            </h1>
            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-1">Ready to explore?</p>
          </div>
        </div>
        <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center relative">
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
          <Compass className="w-5 h-5 text-slate-600" />
        </div>
      </div>

      {/* Main Metric Card */}
      <div className="card-glass bg-indigo-600 border-none relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
        
        <div className="relative z-10 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-1">{student.reading_level}</p>
              <h3 className="text-3xl font-black text-white leading-none">Star Reader</h3>
            </div>
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
              <Trophy className="w-6 h-6 text-amber-300" />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs font-bold text-indigo-100 mb-2">
              <span>XP Progress</span>
              <span>1200 / 1600</span>
            </div>
            <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden backdrop-blur-md border border-white/10 p-0.5">
              <div className="h-full bg-gradient-to-r from-amber-300 to-amber-500 w-[75%] rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Carousel */}
      <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2 -mx-4 px-4 snap-x snap-mandatory">
        <div className="snap-start shrink-0 w-32 card p-4 bg-white border border-orange-100 flex flex-col items-center justify-center text-center">
          <Flame className="w-8 h-8 text-orange-500 mb-2 drop-shadow-sm" />
          <h3 className="text-2xl font-black text-slate-900 leading-none">7<span className="text-sm text-slate-400 ml-0.5">d</span></h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Streak</p>
        </div>
        <div className="snap-start shrink-0 w-32 card p-4 bg-white border border-teal-100 flex flex-col items-center justify-center text-center">
          <Target className="w-8 h-8 text-teal-500 mb-2 drop-shadow-sm" />
          <h3 className="text-2xl font-black text-slate-900 leading-none">85<span className="text-sm text-slate-400 ml-0.5">%</span></h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Daily Goal</p>
        </div>
        <div className="snap-start shrink-0 w-32 card p-4 bg-white border border-sky-100 flex flex-col items-center justify-center text-center">
          <Zap className="w-8 h-8 text-sky-500 mb-2 drop-shadow-sm" />
          <h3 className="text-2xl font-black text-slate-900 leading-none">{student.avg_speed_wpm}</h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Speed WPM</p>
        </div>
      </div>

      {/* Recommended Quests */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-black text-slate-900">Today's Quests</h2>
          <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">See All</span>
        </div>
        
        <div className="space-y-3">
          {/* Main Action Quest */}
          <Link to="/diagnostic" className="card bg-slate-900 p-1 flex items-center shadow-xl hover:scale-[1.02] transition-transform">
            <div className="w-20 h-20 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center m-1 shrink-0">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
            <div className="p-3 flex-1 text-white">
              <div className="badge bg-white/20 text-white border-none mb-1">Assessment</div>
              <h3 className="text-base font-black leading-tight">Reading Diagnostic</h3>
              <p className="text-xs text-slate-400 font-bold mt-1">Earn 50 XP</p>
            </div>
          </Link>

          {/* Regular Quests */}
          {MOCK_LESSONS.map((lesson) => (
            <Link to={`/lesson/${lesson.lesson_id}`} key={lesson.lesson_id} className="card bg-white p-4 flex items-center gap-4 hover:border-indigo-300 transition-colors">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100">
                <BookOpen className="w-5 h-5 text-indigo-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-black text-slate-900 truncate">{lesson.title}</h3>
                <p className="text-xs text-slate-500 font-bold truncate mt-0.5">{lesson.support_focus}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* Special Features */}
      <div className="pt-2">
        <Link to="/planets" className="card relative overflow-hidden group block h-32">
          <div className="absolute inset-0 bg-slate-900 z-0"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-50 z-0"></div>
          <div className="relative z-10 p-5 h-full flex flex-col justify-end">
            <div className="badge bg-white/20 text-white backdrop-blur-md self-start mb-auto border-none shadow-none">Premium Quest</div>
            <h3 className="text-white text-xl font-black">Solar System Journey</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};
