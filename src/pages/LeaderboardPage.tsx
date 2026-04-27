import React from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, ChevronUp, ChevronDown } from "lucide-react";

const LEADERS = [
  { id: 1, name: "Sarah Miller", xp: 12450, level: 15, avatar: "🦁", rank: 1, trend: "up" },
  { id: 2, name: "Leo Chen", xp: 11200, level: 14, avatar: "🦊", rank: 2, trend: "down" },
  { id: 3, name: "Alex (You)", xp: 10800, level: 12, avatar: "🐿️", rank: 3, trend: "up" },
  { id: 4, name: "Emma Watson", xp: 9500, level: 11, avatar: "🐼", rank: 4, trend: "up" },
  { id: 5, name: "Chris Evans", xp: 8200, level: 10, avatar: "🐻", rank: 5, trend: "down" },
];

export const LeaderboardPage = () => {
  return (
    <div className="flex flex-col gap-8 p-6 pt-12 pb-32">
      <header className="text-center">
        <div className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-400/30">
          <Trophy className="w-10 h-10 text-yellow-400" />
        </div>
        <h1 className="text-3xl font-black text-white">Galaxy Leaders</h1>
        <p className="text-slate-400 font-bold">You're in the top 3% this week!</p>
      </header>

      <div className="bg-[#16132F] rounded-[2rem] border border-white/5 overflow-hidden">
        <div className="flex bg-white/5 p-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
          <div className="w-12 text-center">Rank</div>
          <div className="flex-1 px-4">Explorer</div>
          <div className="w-20 text-right">XP</div>
        </div>
        
        <div className="divide-y divide-white/5">
          {LEADERS.map((user) => (
            <motion.div 
              key={user.id}
              className={`flex items-center p-4 ${user.id === 3 ? "bg-[#6C63FF]/10" : ""}`}
            >
              <div className="w-12 flex flex-col items-center">
                {user.rank <= 3 ? (
                  <Medal className={`w-6 h-6 ${
                    user.rank === 1 ? "text-yellow-400" : 
                    user.rank === 2 ? "text-slate-300" : "text-amber-600"
                  }`} />
                ) : (
                  <span className="font-black text-white">{user.rank}</span>
                )}
                {user.trend === "up" ? (
                  <ChevronUp className="w-3 h-3 text-[#43E97B]" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-rose-500" />
                )}
              </div>
              
              <div className="flex-1 flex items-center gap-4 px-4">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-xl shadow-lg">
                  {user.avatar}
                </div>
                <div>
                  <p className="font-black text-white text-sm">{user.name}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Level {user.level}</p>
                </div>
              </div>
              
              <div className="w-20 text-right">
                <p className="font-black text-white">{user.xp.toLocaleString()}</p>
                <p className="text-[10px] font-bold text-[#43CBFF] uppercase tracking-widest">XP</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <button className="w-full bg-white/5 py-6 rounded-[2rem] border border-white/10 font-black text-white transition active:scale-95">
        VIEW FULL RANKINGS
      </button>
    </div>
  );
};
