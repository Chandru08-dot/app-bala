import React from "react";
import { motion } from "framer-motion";
import { Shield, TrendingUp, Calendar, MessageCircle, Heart, Bell } from "lucide-react";

const RECENT_ALERTS = [
  { id: 1, type: "success", text: "Alex finished 'Mercury Outpost' with 92% accuracy!", time: "2h ago" },
  { id: 2, type: "info", text: "New intervention strategy shared by Mrs. Smith.", time: "1d ago" },
];

export const ParentDashboardPage = () => {
  return (
    <div className="flex flex-col gap-8 p-6 pt-12 pb-32 min-h-screen bg-[#0D0B1E]">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Parent Portal</h1>
          <p className="text-slate-400 font-bold">Monitoring Alex's Journey</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
          <Bell className="w-6 h-6 text-slate-400" />
          <div className="absolute top-0 right-0 w-3 h-3 bg-rose-500 rounded-full border-2 border-[#0D0B1E]" />
        </div>
      </header>

      {/* Safety Score */}
      <section className="bg-[linear-gradient(135deg,#43E97B_0%,#38EF7D_100%)] rounded-[2.5rem] p-8 text-slate-900">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-white/20 rounded-xl">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black uppercase tracking-tight">Confidence Level: High</h2>
        </div>
        <p className="font-bold opacity-80 leading-relaxed mb-8">
          Alex has shown consistent improvement in phoneme identification this week. No signs of reading fatigue.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/20 rounded-2xl p-4">
            <p className="text-[10px] font-black uppercase opacity-60">Avg. Accuracy</p>
            <p className="text-2xl font-black">88%</p>
          </div>
          <div className="bg-white/20 rounded-2xl p-4">
            <p className="text-[10px] font-black uppercase opacity-60">Mood Score</p>
            <p className="text-2xl font-black">4.8/5</p>
          </div>
        </div>
      </section>

      {/* Teacher Messages */}
      <section className="bg-[#16132F] rounded-[2.5rem] p-8 border border-white/5">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-black text-white">Mrs. Smith's Updates</h3>
          <MessageCircle className="w-5 h-5 text-[#43CBFF]" />
        </div>
        <div className="space-y-4">
          <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              "Alex is doing great with the new visual tracking exercises. We're moving to Step 2 tomorrow."
            </p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Yesterday, 4:30 PM</span>
              <button className="text-[10px] font-black text-[#43CBFF] uppercase tracking-widest">Reply</button>
            </div>
          </div>
        </div>
      </section>

      {/* Intervention Sync */}
      <section className="bg-[#16132F] rounded-[2.5rem] p-8 border border-white/5">
        <h3 className="text-lg font-black text-white mb-6">At-Home Activities</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-[#6C63FF]/10 rounded-2xl border border-[#6C63FF]/20">
            <Heart className="w-6 h-6 text-[#6C63FF]" />
            <div>
              <p className="text-sm font-bold text-white">Bedtime Reading Pacer</p>
              <p className="text-[10px] text-slate-500">15 mins • Use the app's Zen Mode</p>
            </div>
            <div className="ml-auto w-6 h-6 rounded-full border-2 border-[#6C63FF]" />
          </div>
        </div>
      </section>
    </div>
  );
};
