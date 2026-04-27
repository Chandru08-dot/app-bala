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
    <div className="flex flex-col gap-10 p-8 pt-16 pb-40 min-h-screen bg-transparent">
      <header className="relative">
        <h1 className="text-5xl font-[900] text-white leading-[1.1] mb-2 uppercase italic tracking-tighter">
          Games <br/> <span className="text-[#43CBFF]">Hub</span>
        </h1>
        <p className="text-slate-400 font-bold text-lg">Neural training through play.</p>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#43CBFF] blur-[100px] opacity-10" />
      </header>

      <div className="grid grid-cols-1 gap-8">
        {GAMES.map((game, i) => (
          <motion.div 
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group relative h-64 rounded-[3.5rem] overflow-hidden border-2 border-white/5 hover:border-[#43CBFF]/50 transition-all duration-500 shadow-2xl cursor-pointer"
            onClick={() => setActiveGame(game.name)}
          >
            {/* Background Gradient / Image Simulation */}
            <div 
              className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500"
              style={{ background: `linear-gradient(135deg, ${game.color} 0%, #0D0B1E 100%)` }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,white_0%,transparent_70%)] opacity-10" />
            
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <div className="flex justify-between items-end">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 mb-4 backdrop-blur-md">
                    <game.icon className="w-3 h-3 text-white" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">{game.players} Online</span>
                  </div>
                  <h3 className="text-3xl font-[900] text-white uppercase italic tracking-tighter">{game.name}</h3>
                  <p className="text-sm font-bold text-slate-300 mt-2 max-w-[200px] leading-tight">{game.desc}</p>
                </div>
                
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center text-slate-900 shadow-2xl"
                >
                  <Play className="w-8 h-8 fill-current" />
                </motion.div>
              </div>
            </div>
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
