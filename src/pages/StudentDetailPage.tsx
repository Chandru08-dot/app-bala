import React from "react";
import { useParams, Link } from "react-router-dom";
import { User, Activity, Zap, Target, BookOpen, Clock, ArrowLeft } from "lucide-react";
import { MOCK_STUDENTS, MOCK_SESSIONS } from "../data/mockData";

export const StudentDetailPage = () => {
  const { id } = useParams();
  const student = MOCK_STUDENTS.find(s => s.student_id === id) || MOCK_STUDENTS[0];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Link to="/teacher" className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            {student.name}
          </h1>
          <p className="text-slate-500 font-bold mt-1">Explorer ID: {student.student_id}</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-6 border-l-4 border-emerald-500 flex flex-col justify-center bg-emerald-50/30">
          <Activity className="w-6 h-6 text-emerald-500 mb-2" />
          <h3 className="text-2xl font-black text-slate-900">{student.avg_accuracy_pct}%</h3>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Avg Accuracy</p>
        </div>
        <div className="card p-6 border-l-4 border-amber-500 flex flex-col justify-center bg-amber-50/30">
          <Zap className="w-6 h-6 text-amber-500 mb-2" />
          <h3 className="text-2xl font-black text-slate-900">{student.avg_speed_wpm}</h3>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Speed (WPM)</p>
        </div>
        <div className="card p-6 border-l-4 border-indigo-500 flex flex-col justify-center bg-indigo-50/30">
          <Target className="w-6 h-6 text-indigo-500 mb-2" />
          <h3 className="text-2xl font-black text-slate-900">{student.reading_level}</h3>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Reading Level</p>
        </div>
        <div className="card p-6 border-l-4 border-sky-500 flex flex-col justify-center bg-sky-50/30">
          <Clock className="w-6 h-6 text-sky-500 mb-2" />
          <h3 className="text-2xl font-black text-slate-900">{student.attention_score}</h3>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Focus Score</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Difficult Words & Progress */}
        <div className="lg:col-span-1 space-y-8">
          <div className="card p-6">
            <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-rose-500" />
              Focus Words
            </h2>
            <div className="flex flex-wrap gap-2">
              {student.difficult_words?.map(word => (
                <span key={word} className="px-3 py-1.5 bg-rose-50 text-rose-700 font-bold text-sm rounded-lg border border-rose-100">
                  {word}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-500 font-medium mt-4">These words had a high fixation duration in recent quests.</p>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-500" />
              Growth Chart
            </h2>
            <div className="h-48 flex items-end justify-between gap-1 pb-2">
              {[60, 65, 62, 70, 75, 78, 80, 85].map((height, i) => (
                <div key={i} className="w-full flex flex-col items-center gap-1">
                  <div 
                    className="w-full bg-indigo-200 rounded-t-sm"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Last 8 Sessions</p>
          </div>
        </div>

        {/* Session Log */}
        <div className="lg:col-span-2">
          <div className="card p-6 h-full">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-500" />
              Session Log
            </h2>
            
            <div className="space-y-4">
              {MOCK_SESSIONS.map(session => (
                <div key={session.session_id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-indigo-200 transition-colors">
                  <div>
                    <h4 className="font-bold text-slate-900">{session.session_type}</h4>
                    <p className="text-xs font-bold text-slate-500 mt-1">{new Date(session.started_at).toLocaleString()}</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-center bg-white px-3 py-2 rounded-xl shadow-sm border border-slate-100">
                      <p className="text-sm font-black text-emerald-600">{session.accuracy_pct}%</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accuracy</p>
                    </div>
                    <div className="text-center bg-white px-3 py-2 rounded-xl shadow-sm border border-slate-100">
                      <p className="text-sm font-black text-amber-600">{session.speed_wpm}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">WPM</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
