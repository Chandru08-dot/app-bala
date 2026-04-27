import React from "react";
import { motion } from "framer-motion";
import { Gamepad2, Puzzle, Target, Sparkles, Play } from "lucide-react";

const GAMES = [
  { id: 1, name: "Phoneme Pop", desc: "Pop the correct sound balloons", icon: Target, color: "#6C63FF", players: "2.4k" },
  { id: 2, name: "Word Scramble", desc: "Reorder letters to find the word", icon: Puzzle, color: "#43CBFF", players: "1.8k" },
  { id: 3, name: "Sound Match", desc: "Match sounds to their letters", icon: Gamepad2, color: "#A855F7", players: "3.2k" },
  { id: 4, name: "Galaxy Spell", desc: "Complete the sentence mission", icon: Sparkles, color: "#FDE68A", players: "950" },
];

import toast from "react-hot-toast";

export const GamesHubPage = () => {
  return (
    <div className="flex flex-col gap-8 p-6 pt-12 pb-32">
      <header>
        <h1 className="text-3xl font-black text-white">Games Hub</h1>
        <p className="text-slate-400 font-bold">Learn through play, Explorer!</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {GAMES.map((game) => (
          <motion.div 
            key={game.id}
            whileTap={{ scale: 0.98 }}
            className="bg-[#16132F] rounded-[2.5rem] p-6 border border-white/5 flex items-center gap-6 relative overflow-hidden"
          >
            <div 
              className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl shrink-0"
              style={{ background: `linear-gradient(135deg, ${game.color} 0%, ${game.color}88 100%)` }}
            >
              <game.icon className="w-10 h-10 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-black text-white mb-1">{game.name}</h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-1">{game.desc}</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-[#43CBFF] uppercase tracking-widest bg-[#43CBFF]/10 px-2 py-0.5 rounded">
                  {game.players} playing
                </span>
              </div>
            </div>

            <motion.button 
              whileTap={{ scale: 0.8, rotate: 10 }}
              onClick={() => toast.success(`Launching ${game.name}...`, {
                icon: "🎮",
                style: { borderRadius: '1.5rem', background: '#16132F', color: '#fff', border: '1px solid #43CBFF' }
              })}
              className="p-4 rounded-full bg-white/5 text-white border border-white/10 active:bg-[#43CBFF] transition"
            >
              <Play className="w-6 h-6 fill-current" />
            </motion.button>
          </motion.div>
        ))}
      </div>

      <section className="bg-[#1E1B4B] rounded-[2.5rem] p-8 text-center border border-white/5 mt-4">
        <h2 className="text-xl font-black text-white mb-2">Weekly Challenge</h2>
        <p className="text-sm text-slate-400 mb-6">Win 10 games of "Phoneme Pop" to earn a limited edition Space Helmet!</p>
        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-[#43E97B] w-[40%]" />
        </div>
        <p className="text-[10px] font-bold text-slate-500 uppercase">4 / 10 Games Won</p>
      </section>
    </div>
  );
};
