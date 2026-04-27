import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, RotateCcw, ChevronRight, Check, Brain, Layers } from "lucide-react";
import toast from "react-hot-toast";

const FLASHCARDS = [
  "Archaeology", "Pneumonia", "Pharaoh", "Psychology", "Queue", "Rhythm", "Subtle", "Through", "Xylophone", "Yacht",
  "Acknowledge", "Beautiful", "Conscience", "Daughter", "Experience", "February", "Grateful", "Height", "Immediately", "Jewelry",
  "Knowledge", "Library", "Maintenance", "Neighbor", "Occurrence"
];

export const FlashcardPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % FLASHCARDS.length);
    }, 200);
  };

  const markMastered = () => {
    setMasteredCount(prev => prev + 1);
    toast.success("Mastered!", { icon: "🔥" });
    nextCard();
  };

  return (
    <div className="flex flex-col gap-8 p-6 pt-12 pb-32 min-h-screen bg-transparent">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#6C63FF]/10 rounded-xl text-[#6C63FF]">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">Mastery Cards</h1>
            <p className="text-slate-400 font-bold">25 Tricky Words</p>
          </div>
        </div>
        <div className="w-14 h-14 rounded-full bg-[#6C63FF]/20 border border-[#6C63FF]/30 flex items-center justify-center relative">
          <Brain className="w-6 h-6 text-[#6C63FF]" />
          <div className="absolute -bottom-2 bg-[#6C63FF] text-[8px] px-2 py-0.5 rounded-full text-white font-black">
            {masteredCount}/25
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-12">
        <div 
          className="relative w-full max-w-sm aspect-[4/5] [perspective:1000px] cursor-pointer"
          onClick={() => {
            if (!isFlipped) speak(FLASHCARDS[currentIndex]);
            setIsFlipped(!isFlipped);
          }}
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            className="w-full h-full relative [transform-style:preserve-3d]"
          >
            {/* Front */}
            <div className="absolute inset-0 [backface-visibility:hidden] bg-[#16132F] rounded-[3.5rem] border-4 border-white/10 flex flex-col items-center justify-center p-8 shadow-2xl">
              <p className="text-[10px] font-black text-[#43CBFF] uppercase tracking-widest mb-6">Tap to reveal</p>
              <h2 className="text-4xl font-black text-white text-center break-all leading-tight mb-8">
                {FLASHCARDS[currentIndex]}
              </h2>
              <button 
                onClick={(e) => { e.stopPropagation(); speak(FLASHCARDS[currentIndex]); }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 text-[#43CBFF] active:scale-90 transition shadow-lg"
              >
                <Volume2 className="w-8 h-8" />
              </button>
            </div>

            {/* Back */}
            <div 
              className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-[3.5rem] flex flex-col items-center justify-center p-8 shadow-2xl"
              style={{ transform: "rotateY(180deg)" }}
            >
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Volume2 className="w-16 h-16 text-[#6C63FF] mb-6" />
              </motion.div>
              <h2 className="text-4xl font-black text-slate-900 text-center mb-10">
                {FLASHCARDS[currentIndex]}
              </h2>
              <button 
                onClick={(e) => { e.stopPropagation(); speak(FLASHCARDS[currentIndex]); }}
                className="px-10 py-4 bg-[#6C63FF] rounded-full text-white font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 transition"
              >
                Play Sound
              </button>
            </div>
          </motion.div>
        </div>

        <div className="flex gap-4 w-full max-w-sm">
          <button 
            onClick={(e) => { e.stopPropagation(); nextCard(); }}
            className="flex-1 py-6 rounded-[2.5rem] bg-white/5 border border-white/10 text-white font-black text-lg flex items-center justify-center gap-2 active:bg-white/10 transition"
          >
            <RotateCcw className="w-5 h-5" /> SKIP
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); markMastered(); }}
            className="flex-1 py-6 rounded-[2.5rem] bg-[#43E97B] text-slate-900 font-black text-lg flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(67,233,123,0.3)] active:scale-95 transition"
          >
            <Check className="w-5 h-5" /> MASTERED
          </button>
        </div>
      </div>
    </div>
  );
};
