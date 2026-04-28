import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, ArrowRight, Loader2 } from "lucide-react";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("alex@example.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      let role = "student";
      if (email.includes("teacher")) role = "teacher";
      if (email.includes("parent")) role = "parent";
      navigate(`/${role}`);
    }, 1200);
  };

  return (
    <div className="min-h-full flex flex-col bg-[url('https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=800')] bg-cover bg-center relative pb-10">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-0"></div>
      
      <div className="relative z-10 flex flex-col h-full pt-16 px-6">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center pt-8 pb-12 text-white animate-in slide-in-from-top-4 duration-700">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-[2rem] border border-white/20 flex items-center justify-center shadow-2xl mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Readable</h1>
          <div className="badge bg-white/20 text-white border-none">Explorer Hub</div>
        </div>

        {/* Login Card */}
        <div className="card-glass p-8 mt-auto animate-in slide-in-from-bottom-8 duration-700">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-sm text-slate-600 font-bold">Sign in to continue your quest.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-black text-slate-800 uppercase tracking-widest mb-2 ml-1">Email</label>
              <input 
                type="email" 
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="explorer@example.com"
                required
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-xs font-black text-slate-800 uppercase tracking-widest">Password</label>
                <a href="#" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Forgot?</a>
              </div>
              <input 
                type="password" 
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary w-full flex items-center justify-center gap-2 mt-8 py-5 text-lg"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>ENTER HUB <ArrowRight className="w-6 h-6" /></>
              )}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 pt-6 border-t border-slate-200/50">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 text-center">Fast Login</p>
            <div className="flex justify-center gap-2">
              {[
                { label: 'S', email: 'alex@example.com' },
                { label: 'T', email: 'teacher@example.com' },
                { label: 'P', email: 'parent@example.com' }
              ].map(acc => (
                <button
                  key={acc.label}
                  type="button"
                  onClick={() => setEmail(acc.email)}
                  className="w-12 h-12 bg-white/50 hover:bg-white rounded-2xl text-slate-800 font-black shadow-sm transition-all border border-white focus:ring-2 focus:ring-indigo-500"
                >
                  {acc.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs font-bold text-white/60 mt-8">
          Don't have an account? <Link to="/register" className="text-white hover:underline">Join the Mission</Link>
        </p>
      </div>
    </div>
  );
};
