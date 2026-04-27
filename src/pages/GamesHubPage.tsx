import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Puzzle, Target, Sparkles, Play } from "lucide-react";
import { GameOverlay } from "../components/GameOverlay";
import toast from "react-hot-toast";

const GAMES = [
  { id: 1, name: "Phoneme Pop", desc: "Pop the correct sound balloons", icon: Target, color: "#6C63FF", players: "2.4k" },
  { id: 2, name: "Word Scramble", desc: "Reorder letters to find the word", icon: Puzzle, color: "#43CBFF", players: "1.8k" },
  { id: 3, name: "Sound Match", desc: "Match sounds to their letters", icon: Gamepad2, color: "#A855F7", players: "3.2k" },
  { id: 4, name: "Galaxy Spell", desc: "Complete the sentence mission", icon: Sparkles, color: "#FDE68A", players: "950" },
];

export const GamesHubPage = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-8 p-6 pt-12 pb-32 min-h-screen bg-transparent">
      <header>
        <h1 className="text-3xl font-black text-white">Games Hub</h1>
        <p className="text-slate-400 font-bold">Learn through play, Explorer!</p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {GAMES.map((game) => (
          <motion.div 
            key={game.id}
            whileTap={{ scale: 0.98 }}
            className="bg-[#16132F]/80 backdrop-blur-xl rounded-[2.5rem] p-6 border border-white/5 flex items-center gap-6 relative overflow-hidden"
          >
            <div 
              className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl shrink-0"
              style={{ background: `linear-gradient(135deg, ${game.color} 0%, ${game.color}88 100%)` }}
            >
              <game.icon className="w-10 h-10 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-black text-white mb-1">{game.name}</h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-1 font-medium">{game.desc}</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-[#43CBFF] uppercase tracking-widest bg-[#43CBFF]/10 px-2 py-0.5 rounded">
                  {game.players} playing
                </span>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: game.color }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveGame(game.name)}
              className="p-4 rounded-full bg-white/5 text-white border border-white/10 transition-colors"
            >
              <Play className="w-6 h-6 fill-current" />
            </motion.button>
          </motion.div>
        ))}
      </div>

      <GameOverlay 
        gameName={activeGame || ""} 
        isOpen={!!activeGame} 
        onClose={() => setActiveGame(null)} 
      />
    </div>
  );
};
