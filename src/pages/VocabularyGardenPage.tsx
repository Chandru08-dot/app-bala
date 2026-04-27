import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Flower2, Wind, Sun, Droplets, Plus } from "lucide-react";
import toast from "react-hot-toast";

const INITIAL_WORDS = [
  { word: "Euphoria", size: 100, color: "#6C63FF", x: 20, y: 30 },
  { word: "Nebula", size: 85, color: "#43CBFF", x: 60, y: 25 },
  { word: "Phoneme", size: 70, color: "#A855F7", x: 40, y: 50 },
  { word: "Galaxy", size: 90, color: "#FDE68A", x: 75, y: 60 },
];

export const VocabularyGardenPage = () => {
  const [words, setWords] = useState(INITIAL_WORDS);
  const [isWatering, setIsWatering] = useState(false);

  const addRandomWord = () => {
    const wordList = ["Pneumonia", "Archaeology", "Rhythm", "Subtle", "Through"];
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    const newWord = {
      word: randomWord,
      size: 60 + Math.random() * 40,
      color: `hsl(${Math.random() * 360}, 70%, 70%)`,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
    };
    setWords([...words, newWord]);
    toast.success(`'${randomWord}' planted!`, { icon: "🌱" });
  };

  const waterGarden = () => {
    setIsWatering(true);
    toast("Watering your vocabulary...", { icon: "💧" });
    setTimeout(() => setIsWatering(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 p-6 pt-12 pb-32 min-h-screen bg-transparent overflow-hidden relative">
      <header className="flex justify-between items-center z-10">
        <div>
          <h1 className="text-3xl font-black text-white leading-tight">Living Garden</h1>
          <p className="text-slate-400 font-bold">Interact with your growth</p>
        </div>
        <button 
          onClick={addRandomWord}
          className="w-12 h-12 rounded-full bg-[#6C63FF] flex items-center justify-center text-white shadow-lg active:scale-90 transition"
        >
          <Plus className="w-6 h-6" />
        </button>
      </header>

      <div className="flex-1 relative">
        <AnimatePresence>
          {words.map((w, i) => (
            <motion.div
              key={`${w.word}-${i}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isWatering ? 1.3 : 1, 
                opacity: 1,
                x: isWatering ? [0, 5, -5, 0] : 0,
                y: isWatering ? [0, -10, 0] : 0
              }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute flex flex-col items-center cursor-pointer group"
              style={{ left: `${w.x}%`, top: `${w.y}%` }}
              onClick={() => toast(`Explorer Level: ${w.word}`)}
            >
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <div 
                  className="rounded-full shadow-2xl flex items-center justify-center border-2"
                  style={{ 
                    width: w.size, 
                    height: w.size, 
                    backgroundColor: `${w.color}33`,
                    borderColor: w.color
                  }}
                >
                  <Flower2 className="w-1/2 h-1/2" style={{ color: w.color }} />
                </div>
                {/* Visual Glow */}
                <div 
                  className="absolute inset-0 rounded-full blur-xl opacity-20 group-hover:opacity-60 transition"
                  style={{ backgroundColor: w.color }}
                />
              </motion.div>
              <div className="mt-4 bg-[#16132F]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span className="text-[10px] font-black text-white uppercase tracking-tighter">{w.word}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={waterGarden}
        className="bg-[#16132F]/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 flex items-center justify-between shadow-2xl z-10"
      >
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isWatering ? "bg-[#43CBFF] text-white rotate-12" : "bg-yellow-400/10 text-yellow-400"}`}>
            {isWatering ? <Droplets className="w-8 h-8" /> : <Sun className="w-8 h-8" />}
          </div>
          <div className="text-left">
            <h3 className="font-black text-white text-lg">{isWatering ? "Energizing..." : "Growth Boost"}</h3>
            <p className="text-xs text-slate-500">Water your garden to see it jump!</p>
          </div>
        </div>
        <Wind className={`w-6 h-6 text-slate-500 ${isWatering ? "animate-spin" : "animate-pulse"}`} />
      </motion.button>
    </div>
  );
};
