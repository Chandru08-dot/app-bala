import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Rocket, Star, ShieldCheck } from "lucide-react";

export const PlanetLessonPage = () => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900 overflow-y-auto text-slate-100 animate-in fade-in duration-700">
      <Link to="/student" className="fixed top-6 left-6 z-50 p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
        <ArrowLeft className="w-6 h-6 text-white" />
      </Link>

      {/* Hero */}
      <div className="relative h-screen flex flex-col items-center justify-center text-center p-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        
        <div className="relative z-10 animate-in slide-in-from-bottom-8 duration-1000 delay-300">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20">
            <Rocket className="w-12 h-12 text-sky-400" />
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 tracking-tighter mb-6">
            Solar System
          </h1>
          <p className="text-2xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Embark on a grand tour of our cosmic neighborhood. Discover the wonders orbiting our Sun.
          </p>
        </div>
        
        <div className="absolute bottom-10 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Planets Content */}
      <div className="max-w-4xl mx-auto px-6 py-24 space-y-32">
        {/* The Sun */}
        <div className="flex flex-col md:flex-row items-center gap-12 group">
          <div className="w-64 h-64 shrink-0 rounded-full bg-gradient-to-tr from-orange-600 to-yellow-300 shadow-[0_0_100px_rgba(251,191,36,0.4)] group-hover:shadow-[0_0_150px_rgba(251,191,36,0.6)] transition-all duration-700"></div>
          <div>
            <h2 className="text-5xl font-black text-amber-400 mb-6">The Sun</h2>
            <p className="text-2xl leading-[2] font-medium text-slate-300">
              The Sun is a huge, glowing ball of hot gas at the center of our solar system. It gives us light and keeps our planet warm enough for life to exist.
            </p>
            <div className="mt-8 flex gap-2">
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-amber-200 uppercase tracking-widest">Star</span>
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-amber-200 uppercase tracking-widest">Hot Plasma</span>
            </div>
          </div>
        </div>

        {/* Earth */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 group">
          <div className="w-64 h-64 shrink-0 rounded-full bg-gradient-to-tr from-emerald-600 to-sky-400 shadow-[0_0_80px_rgba(56,189,248,0.2)] group-hover:shadow-[0_0_100px_rgba(56,189,248,0.4)] transition-all duration-700"></div>
          <div className="text-right">
            <h2 className="text-5xl font-black text-sky-400 mb-6">Earth</h2>
            <p className="text-2xl leading-[2] font-medium text-slate-300">
              Earth is our home planet. It is the only place we know of that has oceans of liquid water and breathes of fresh air, making it perfect for life.
            </p>
            <div className="mt-8 flex gap-2 justify-end">
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-sky-200 uppercase tracking-widest">Habitable</span>
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-sky-200 uppercase tracking-widest">1 Moon</span>
            </div>
          </div>
        </div>

        {/* Jupiter */}
        <div className="flex flex-col md:flex-row items-center gap-12 group">
          <div className="w-80 h-80 shrink-0 rounded-full bg-gradient-to-tr from-orange-800 to-amber-200 shadow-[0_0_80px_rgba(217,119,6,0.2)] group-hover:shadow-[0_0_100px_rgba(217,119,6,0.4)] transition-all duration-700 flex items-center justify-center relative overflow-hidden">
            {/* Fake Storm Spot */}
            <div className="absolute top-2/3 right-1/4 w-20 h-12 rounded-[100%] bg-orange-900/40 rotate-12 blur-sm"></div>
          </div>
          <div>
            <h2 className="text-5xl font-black text-orange-400 mb-6">Jupiter</h2>
            <p className="text-2xl leading-[2] font-medium text-slate-300">
              Jupiter is the giant of our solar system. It is made mostly of gas and has wild, swirling storms. The most famous storm is called the Great Red Spot.
            </p>
            <div className="mt-8 flex gap-2">
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-orange-200 uppercase tracking-widest">Gas Giant</span>
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-orange-200 uppercase tracking-widest">95 Moons</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Completion */}
      <div className="py-32 text-center relative overflow-hidden bg-slate-950 border-t border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1),transparent_50%)]"></div>
        <div className="relative z-10">
          <ShieldCheck className="w-20 h-20 text-emerald-400 mx-auto mb-8" />
          <h2 className="text-4xl font-black text-white mb-8 tracking-tight">Mission Accomplished!</h2>
          <Link to="/student" className="inline-flex items-center gap-3 px-12 py-5 bg-white text-slate-900 font-black rounded-full hover:bg-slate-200 transition-colors">
            <Star className="w-6 h-6 fill-current text-amber-400" />
            CLAIM BADGE & RETURN
          </Link>
        </div>
      </div>
    </div>
  );
};
