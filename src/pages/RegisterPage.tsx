import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, BookOpen, Users, Rocket, Loader2, ArrowLeft } from "lucide-react";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"student" | "teacher" | "parent">("student");
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate(`/${role}`), 1200);
  };

  return (
    <div className="min-h-full flex flex-col bg-slate-50 relative pb-10">
      
      {/* Top Header */}
      <div className="h-16 flex items-center px-4">
        <Link to="/" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
      </div>

      <div className="flex-1 px-6 pt-2 pb-8 flex flex-col">
        <div className="text-center mb-8 animate-in slide-in-from-top-4 duration-500">
          <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-4 shadow-[0_8px_30px_rgb(99,102,241,0.4)]">
            <Rocket className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Join the Mission</h1>
          <p className="text-slate-500 font-bold mt-1">Create your Explorer account.</p>
        </div>

        <form onSubmit={handleRegister} className="flex-1 flex flex-col animate-in slide-in-from-bottom-8 duration-500">
          
          <div className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-black text-slate-800 uppercase tracking-widest mb-3 ml-1">I am a...</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`flex-1 p-3 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all ${
                    role === "student" ? "bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm" : "bg-white border-white text-slate-400 shadow-sm hover:border-indigo-200"
                  }`}
                >
                  <User className="w-6 h-6" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("teacher")}
                  className={`flex-1 p-3 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all ${
                    role === "teacher" ? "bg-amber-50 border-amber-500 text-amber-700 shadow-sm" : "bg-white border-white text-slate-400 shadow-sm hover:border-amber-200"
                  }`}
                >
                  <BookOpen className="w-6 h-6" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Teacher</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("parent")}
                  className={`flex-1 p-3 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all ${
                    role === "parent" ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm" : "bg-white border-white text-slate-400 shadow-sm hover:border-emerald-200"
                  }`}
                >
                  <Users className="w-6 h-6" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Parent</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <input type="text" className="input-field" placeholder="Full Name" required />
              </div>
              <div>
                <input type="email" className="input-field" placeholder="Email Address" required />
              </div>
              <div>
                <input type="password" className="input-field" placeholder="Create Password" required />
              </div>
            </div>
          </div>

          <div className="mt-auto pt-8">
            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-5 text-lg" disabled={loading}>
              {loading ? <><Loader2 className="w-6 h-6 animate-spin" /></> : "CREATE ACCOUNT"}
            </button>
            <p className="mt-6 text-center text-xs font-bold text-slate-500">
              Already have an account? <Link to="/" className="text-indigo-600 hover:underline">Sign In</Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};
