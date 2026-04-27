import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Trophy, Sparkles, Star, Target, Puzzle, Gamepad2, Volume2 } from "lucide-react";
import toast from "react-hot-toast";

interface GameOverlayProps {
  gameName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const GameOverlay: React.FC<GameOverlayProps> = ({ gameName, isOpen, onClose }) => {
  const [gameState, setGameState] = useState<"lobby" | "playing" | "finished">("lobby");
  const [score, setScore] = useState(0);
  const [gameStep, setGameStep] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setGameState("lobby");
      setScore(0);
      setGameStep(0);
    }
  }, [isOpen]);

  const startGame = () => setGameState("playing");

  const finishGame = (points: number) => {
    setScore(points);
    setGameState("finished");
    toast.success("Game Complete!", { icon: "🎮" });
  };

  // --- MINI-GAME UI COMPONENTS ---

  const PhonemePop = () => (
    <div className="flex flex-col items-center gap-8 w-full">
      <p className="text-xl font-black text-[#43CBFF] uppercase tracking-widest">Pop all the 'B' bubbles!</p>
      <div className="relative w-full h-[300px] bg-white/5 rounded-[3rem] overflow-hidden border border-white/10">
        {[...Array(6)].map((_, i) => (
          <motion.button
            key={i}
            initial={{ x: Math.random() * 200, y: 300 }}
            animate={{ y: -100, x: (Math.random() * 200) }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
            onClick={() => { setScore(s => s + 10); toast("Popped!", { icon: "💥" }); if(score > 40) finishGame(60); }}
            className="absolute w-16 h-16 rounded-full bg-[#6C63FF] border-2 border-white/20 flex items-center justify-center text-2xl font-black text-white shadow-xl"
          >
            {i % 2 === 0 ? "b" : "d"}
          </motion.button>
        ))}
      </div>
      <p className="text-3xl font-black text-white">Score: {score}</p>
    </div>
  );

  const WordScramble = () => (
    <div className="flex flex-col items-center gap-10 w-full text-center">
      <p className="text-xl font-black text-[#43CBFF] uppercase tracking-widest italic">Fix the Jumbled Word</p>
      <div className="flex gap-4">
        {["A", "G", "L", "X", "A", "Y"].map((l, i) => (
          <motion.div 
            key={i} 
            drag 
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl font-[900] text-slate-900 shadow-2xl"
          >
            {l}
          </motion.div>
        ))}
      </div>
      <button 
        onClick={() => finishGame(120)}
        className="w-full max-w-xs py-6 bg-[#43E97B] text-slate-900 rounded-[2rem] font-black text-xl"
      >
        SOLVE: GALAXY
      </button>
    </div>
  );

  const SoundMatch = () => (
    <div className="flex flex-col items-center gap-8 w-full">
      <p className="text-xl font-black text-[#43CBFF] uppercase tracking-widest">Match Sound to Letter</p>
      <button onClick={() => { const u = new SpeechSynthesisUtterance("ch"); window.speechSynthesis.speak(u); }} className="p-8 bg-[#6C63FF] rounded-full shadow-2xl animate-pulse">
        <Volume2 className="w-12 h-12 text-white" />
      </button>
      <div className="grid grid-cols-2 gap-4 w-full">
        {["sh", "ch", "th", "ph"].map(l => (
          <button 
            key={l}
            onClick={() => { if(l === "ch") finishGame(200); else toast.error("Try again!"); }}
            className="py-8 bg-white/5 border-2 border-white/10 rounded-[2rem] text-3xl font-black text-white hover:bg-[#6C63FF] transition"
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );

  const GalaxySpell = () => (
    <div className="flex flex-col items-center gap-10 w-full text-center">
      <p className="text-xl font-black text-[#43CBFF] uppercase tracking-widest">Complete the Mission</p>
      <h3 className="text-4xl font-black text-white leading-tight">
        "The <span className="text-[#6C63FF] border-b-4 border-dashed border-[#6C63FF] px-4">______</span> is glowing."
      </h3>
      <div className="grid grid-cols-1 gap-4 w-full">
        {["Sun", "Soon", "Son"].map(l => (
          <button 
            key={l}
            onClick={() => { if(l === "Sun") finishGame(150); else toast.error("Wrong spelling!"); }}
            className="py-6 bg-white/5 border-2 border-white/10 rounded-[2rem] text-xl font-black text-white hover:border-[#6C63FF] transition"
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          className="fixed inset-0 z-[1000] bg-[#0D0B1E] flex flex-col p-8 overflow-y-auto"
        >
          <header className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-[#6C63FF]/20 flex items-center justify-center text-[#6C63FF]">
                 <Gamepad2 className="w-6 h-6" />
               </div>
               <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{gameName}</h2>
            </div>
            <button onClick={onClose} className="p-4 bg-white/5 rounded-full border border-white/10"><X className="w-6 h-6 text-white" /></button>
          </header>

          <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
            {gameState === "lobby" && (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center">
                <div className="w-40 h-40 rounded-[3.5rem] bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] flex items-center justify-center mx-auto mb-10 shadow-[0_30px_60px_rgba(108,99,255,0.4)]">
                  <Play className="w-16 h-16 text-white fill-current" />
                </div>
                <h3 className="text-5xl font-[900] text-white mb-4 uppercase italic tracking-tighter">Ready?</h3>
                <p className="text-slate-400 font-bold text-lg mb-12">Deploying neural stabilizers for {gameName}.</p>
                <button 
                  onClick={startGame}
                  className="w-full py-7 bg-white text-slate-900 rounded-[2.5rem] font-[900] text-2xl shadow-2xl active:scale-95 transition"
                >
                  INITIALIZE
                </button>
              </motion.div>
            )}

            {gameState === "playing" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
                {gameName === "Phoneme Pop" && <PhonemePop />}
                {gameName === "Word Scramble" && <WordScramble />}
                {gameName === "Sound Match" && <SoundMatch />}
                {gameName === "Galaxy Spell" && <GalaxySpell />}
              </motion.div>
            )}

            {gameState === "finished" && (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center w-full">
                <div className="relative inline-block mb-10">
                  <Trophy className="w-32 h-32 text-yellow-400 mx-auto drop-shadow-[0_0_30px_rgba(250,204,21,0.5)]" />
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-4 border-dashed border-yellow-400/30 rounded-full" />
                </div>
                <h3 className="text-5xl font-[900] text-white mb-2 uppercase italic tracking-tighter">Victory!</h3>
                <p className="text-2xl font-bold text-[#43CBFF] mb-12 tracking-widest uppercase">Score: {score}</p>
                
                <div className="bg-[#16132F] rounded-[3rem] p-10 border-2 border-[#43CBFF]/30 mb-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10"><Sparkles className="w-20 h-20 text-[#43CBFF]" /></div>
                  <div className="flex items-center justify-center gap-3 text-yellow-400 mb-4">
                    <Star className="w-6 h-6 fill-current" />
                    <span className="font-black text-sm uppercase tracking-[0.3em]">Neural Rewards</span>
                  </div>
                  <p className="text-4xl font-[900] text-white">+250 XP</p>
                  <p className="text-xl font-black text-[#43CBFF] mt-2">+50 Coins</p>
                </div>

                <button 
                  onClick={onClose}
                  className="w-full py-7 bg-white text-slate-900 rounded-[2.5rem] font-[900] text-2xl shadow-2xl active:scale-95 transition"
                >
                  DISMISS
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
