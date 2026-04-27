import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Trophy, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

interface GameOverlayProps {
  gameName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const GameOverlay: React.FC<GameOverlayProps> = ({ gameName, isOpen, onClose }) => {
  const [gameState, setGameState] = useState<"lobby" | "playing" | "finished">("lobby");
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setGameState("lobby");
      setScore(0);
    }
  }, [isOpen]);

  const startGame = () => {
    setGameState("playing");
    setTimeout(() => {
      setGameState("finished");
      setScore(Math.floor(Math.random() * 500) + 500);
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-[#0D0B1E] flex flex-col p-6"
        >
          <header className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-white">{gameName}</h2>
            <button onClick={onClose} className="p-3 bg-white/5 rounded-full"><X className="w-6 h-6 text-white" /></button>
          </header>

          <div className="flex-1 flex flex-col items-center justify-center">
            {gameState === "lobby" && (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center">
                <div className="w-32 h-32 rounded-[2.5rem] bg-[#6C63FF] flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <Play className="w-12 h-12 text-white fill-current" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Ready to Play?</h3>
                <p className="text-slate-400 font-bold mb-10">Conquer {gameName} to earn Galaxy Coins!</p>
                <button 
                  onClick={startGame}
                  className="w-full max-w-xs py-6 bg-white text-slate-900 rounded-[2rem] font-black text-xl shadow-2xl"
                >
                  START GAME
                </button>
              </motion.div>
            )}

            {gameState === "playing" && (
              <div className="text-center">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-24 h-24 border-4 border-[#43CBFF] border-t-transparent rounded-full mx-auto mb-8"
                />
                <p className="text-2xl font-black text-white">CHALLENGE ACTIVE...</p>
                <p className="text-xs text-slate-500 mt-2 uppercase tracking-widest">Telemetry enabled</p>
              </div>
            )}

            {gameState === "finished" && (
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center">
                <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-8" />
                <h3 className="text-4xl font-black text-white mb-2">Victory!</h3>
                <p className="text-xl font-bold text-[#43CBFF] mb-8">Score: {score}</p>
                
                <div className="bg-white/5 rounded-3xl p-6 border border-white/10 mb-10">
                  <div className="flex items-center gap-3 text-yellow-400 mb-2">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-black text-sm uppercase">Rewards Earned</span>
                  </div>
                  <p className="text-2xl font-black text-white">+50 Galaxy Coins</p>
                </div>

                <button 
                  onClick={onClose}
                  className="w-full max-w-xs py-6 bg-white text-slate-900 rounded-[2rem] font-black text-xl shadow-2xl"
                >
                  RETURN TO HUB
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
