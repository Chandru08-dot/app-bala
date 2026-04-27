import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, ChevronLeft, ChevronRight, Volume2, RotateCcw } from "lucide-react";

const TRICKY_WORDS = [
  { word: "Euphoria", definition: "Intense happiness", example: "He felt euphoria after the win.", color: "#6C63FF" },
  { id: 2, word: "Nebula", definition: "A giant cloud of dust and gas in space", example: "The Orion Nebula is beautiful.", color: "#43CBFF" },
  { id: 3, word: "Phoneme", definition: "The smallest unit of sound", example: "The word 'cat' has three phonemes.", color: "#A855F7" },
];

export const FlashcardPage = () => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const next = () => {
    setFlipped(false);
    setIndex((prev) => (prev + 1) % TRICKY_WORDS.length);
  };

  const prev = () => {
    setFlipped(false);
    setIndex((prev) => (prev - 1 + TRICKY_WORDS.length) % TRICKY_WORDS.length);
  };

  return (
    <div className="flex flex-col gap-8 p-6 pt-12 pb-32 min-h-screen bg-[#0D0B1E]">
      <header className="flex items-center gap-4">
        <div className="p-3 bg-[#6C63FF]/10 rounded-xl text-[#6C63FF]">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white">Flashcards</h1>
          <p className="text-slate-400 font-bold">Master your tricky words</p>
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-center items-center gap-12">
        <div className="relative w-full max-w-xs h-96 perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={index + (flipped ? "-flipped" : "-front")}
              initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setFlipped(!flipped)}
              className="w-full h-full cursor-pointer"
            >
              <div className={`w-full h-full rounded-[3rem] p-10 flex flex-col items-center justify-center text-center shadow-2xl border border-white/10 ${
                flipped ? "bg-[#16132F]" : "bg-[linear-gradient(135deg,#1E1B4B_0%,#0F0D29_100%)]"
              }`}>
                {!flipped ? (
                  <>
                    <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tight">
                      {TRICKY_WORDS[index].word}
                    </h2>
                    <Volume2 className="w-8 h-8 text-[#43CBFF] opacity-50" />
                  </>
                ) : (
                  <>
                    <p className="text-[10px] font-black text-[#43CBFF] uppercase tracking-widest mb-4">Definition</p>
                    <p className="text-xl text-white font-medium mb-8 leading-relaxed">
                      {TRICKY_WORDS[index].definition}
                    </p>
                    <p className="text-xs text-slate-500 italic">
                      "{TRICKY_WORDS[index].example}"
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-8">
          <button onClick={prev} className="p-4 rounded-full bg-white/5 border border-white/10 text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-sm font-black text-slate-500">
            {index + 1} / {TRICKY_WORDS.length}
          </span>
          <button onClick={next} className="p-4 rounded-full bg-white/5 border border-white/10 text-white">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <button className="w-full py-6 rounded-[2rem] bg-[#6C63FF] font-black text-white flex items-center justify-center gap-2 shadow-lg shadow-[#6C63FF]/30">
        <RotateCcw className="w-5 h-5" /> RE-LEARN ALL
      </button>
    </div>
  );
};
