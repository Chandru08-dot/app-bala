import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Volume2, Sparkles } from "lucide-react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export const SquirrelGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const getPageSummary = () => {
    switch (location.pathname) {
      case "/dashboard": return "Welcome back, Explorer! Your Mars mission is ready. Let's practice some tricky words!";
      case "/expedition": return "The solar system is full of challenges. Pick a planet to start your reading adventure!";
      case "/games": return "Neural training time! Choose a game to sharpen your phonics skills.";
      case "/fame": return "Look at those trophies! You're becoming a legendary reader.";
      case "/flashcards": return "Time to master these 25 tricky words. Tap the volume button to hear them!";
      case "/parent": return "Hi! This is the command center for parents. Check out Leo's amazing progress.";
      default: return "I'm here to help you on your reading journey! What should we do next?";
    }
  };

  const speakSummary = () => {
    const summary = getPageSummary();
    const utterance = new SpeechSynthesisUtterance(summary);
    utterance.rate = 0.9;
    utterance.pitch = 1.3; // Squeaky squirrel voice
    window.speechSynthesis.cancel(); // Stop any current speech
    window.speechSynthesis.speak(utterance);
    toast("Reading page overview...", { icon: "🐿️" });
  };

  return (
    <div className="fixed bottom-24 right-6 z-[400]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="mb-4 w-64 rounded-[2.5rem] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-[#6C63FF] relative"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-t-4 border-l-4 border-[#6C63FF] rotate-45" />
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-black text-[#6C63FF] uppercase tracking-[0.2em]">Neural Guide</span>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-sm font-[900] text-slate-800 leading-relaxed mb-8">
              {getPageSummary()}
            </p>
            <button 
              onClick={speakSummary}
              className="w-full py-4 bg-[#6C63FF] text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition"
            >
              <Volume2 className="w-4 h-4" /> Listen to Guide
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          y: [0, -10, 0],
          boxShadow: ["0 0 0px rgba(108,99,255,0)", "0 0 30px rgba(108,99,255,0.4)", "0 0 0px rgba(108,99,255,0)"] 
        }}
        transition={{ duration: 3, repeat: Infinity }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-24 w-24 rounded-[2.5rem] bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] flex items-center justify-center text-5xl shadow-2xl border-4 border-white/20 relative"
      >
        🐿️
        <div className="absolute -top-2 -right-2">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-yellow-400 p-2 rounded-full shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-slate-900" />
          </motion.div>
        </div>
      </motion.button>
    </div>
  );
};
