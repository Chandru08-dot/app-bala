import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Flower2, Wind, Sun, Droplets } from "lucide-react";
import toast from "react-hot-toast";

const WORDS = [
  { word: "Euphoria", size: 120, color: "#6C63FF", icon: Flower2 },
  { word: "Nebula", size: 100, color: "#43CBFF", icon: Sprout },
  { word: "Phoneme", size: 80, color: "#A855F7", icon: Flower2 },
  { word: "Galaxy", size: 110, color: "#FDE68A", icon: Sprout },
  { word: "Reading", size: 90, color: "#43E97B", icon: Flower2 },
];

export const VocabularyGardenPage = () => {
  const [isWatering, setIsWatering] = useState(false);

  const waterGarden = () => {
    setIsWatering(true);
    toast("Watering your vocabulary...", { icon: "💧" });
    setTimeout(() => setIsWatering(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 p-6 pt-12 pb-32 min-h-screen bg-transparent overflow-hidden relative">
      <header>
        <h1 className="text-3xl font-black text-white">Vocab Garden</h1>
        <p className="text-slate-400 font-bold">Watch your vocabulary grow!</p>
      </header>

      <div className="flex-1 relative">
        {WORDS.map((w, i) => (
          <motion.div
            key={w.word}
            initial={{ scale: 0, y: 100 }}
            animate={{ 
              scale: isWatering ? 1.2 : 1, 
              y: 0,
              rotate: isWatering ? [0, 5, -5, 0] : 0
            }}
            transition={{ delay: i * 0.1, type: "spring" }}
            className="absolute flex flex-col items-center"
            style={{ 
              left: `${15 + (i * 20) % 70}%`, 
              top: `${20 + (i * 15) % 60}%` 
            }}
            onClick={() => toast(`Level 3 ${w.word}!`)}
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="flex items-center justify-center rounded-full shadow-2xl relative cursor-pointer"
              style={{ 
                width: w.size, 
                height: w.size, 
                backgroundColor: `${w.color}22`,
                border: `2px solid ${w.color}44`
              }}
            >
              <w.icon className="w-1/2 h-1/2" style={{ color: w.color }} />
              <div className="absolute -bottom-8 bg-[#16132F] px-3 py-1 rounded-full border border-white/5 whitespace-nowrap">
                <span className="text-[10px] font-black text-white uppercase">{w.word}</span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={waterGarden}
        className="bg-[#16132F] rounded-[2.5rem] p-8 border border-white/5 flex items-center justify-between active:border-[#43CBFF] transition"
      >
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl transition ${isWatering ? "bg-[#43CBFF] text-white" : "bg-yellow-400/10 text-yellow-400"}`}>
            {isWatering ? <Droplets className="w-6 h-6 animate-bounce" /> : <Sun className="w-6 h-6" />}
          </div>
          <div className="text-left">
            <h3 className="font-black text-white">{isWatering ? "Watering..." : "Daily Sunshine"}</h3>
            <p className="text-xs text-slate-500">Read for 5 mins to water your garden</p>
          </div>
        </div>
        <Wind className={`w-6 h-6 text-slate-500 ${isWatering ? "animate-spin" : "animate-pulse"}`} />
      </motion.button>
    </div>
  );
};
