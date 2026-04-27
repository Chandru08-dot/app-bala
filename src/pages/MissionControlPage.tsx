import React from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Target, Activity, Clock, Zap, AlertCircle } from "lucide-react";

const DATA = [
  { day: "Mon", accuracy: 82 },
  { day: "Tue", accuracy: 85 },
  { day: "Wed", accuracy: 84 },
  { day: "Thu", accuracy: 88 },
  { day: "Fri", accuracy: 92 },
  { day: "Sat", accuracy: 90 },
  { day: "Sun", accuracy: 94 },
];

export const MissionControlPage = () => {
  return (
    <div className="flex flex-col gap-8 p-6 pt-12 pb-32">
      <header>
        <h1 className="text-3xl font-black text-white">Mission Control</h1>
        <p className="text-slate-400 font-bold">Your reading telemetry data</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Accuracy", val: "94%", icon: Target, color: "#43E97B" },
          { label: "Stability", val: "High", icon: Activity, color: "#43CBFF" },
          { label: "Focus", val: "88%", icon: Zap, color: "#A855F7" },
          { label: "Daily Avg", val: "12m", icon: Clock, color: "#FDE68A" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#16132F] rounded-3xl p-5 border border-white/5">
            <stat.icon className="w-5 h-5 mb-3" style={{ color: stat.color }} />
            <p className="text-[10px] font-bold text-slate-500 uppercase">{stat.label}</p>
            <p className="text-2xl font-black text-white">{stat.val}</p>
          </div>
        ))}
      </div>

      <section className="bg-[#16132F] rounded-[2rem] p-6 border border-white/5">
        <h2 className="text-lg font-black text-white mb-6">Accuracy Trend</h2>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 10 }} />
              <YAxis hide domain={[70, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#1E1B4B", border: "none", borderRadius: "12px" }}
                itemStyle={{ color: "#43CBFF", fontWeight: "black" }}
              />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#43CBFF" 
                strokeWidth={4} 
                dot={{ fill: "#43CBFF", strokeWidth: 2, r: 4 }} 
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="bg-amber-500/10 border border-amber-500/20 rounded-[2rem] p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-500 mt-1" />
          <div>
            <h3 className="font-black text-white text-base">Focus Recommendation</h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              You are struggling with <span className="text-amber-500 font-bold">multi-syllabic words</span>. Try the targeted training missions!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
