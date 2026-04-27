import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

interface SquirrelGuideProps {
  message: string;
  isHappy?: boolean;
  isVisible?: boolean;
}

export const SquirrelGuide: React.FC<SquirrelGuideProps> = ({ 
  message, 
  isHappy = true, 
  isVisible = true 
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          layout
          className="fixed bottom-32 right-6 z-[100] flex flex-col items-end gap-3"
        >
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                className="relative max-w-[220px] rounded-[2rem] bg-white p-6 text-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-2 border-[#6C63FF]/30"
              >
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center text-white shadow-lg"
                >
                  <X className="w-3 h-3" />
                </button>
                <p className="text-xs font-black leading-tight mb-2 text-[#6C63FF] uppercase tracking-widest">Guide Tip</p>
                <p className="text-sm font-bold leading-tight">{message}</p>
                {/* Bubble Tail */}
                <div className="absolute -bottom-1.5 right-8 h-3 w-3 rotate-45 bg-white border-r-2 border-b-2 border-[#6C63FF]/30" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className={`relative group ${isExpanded ? "w-20 h-20" : "w-16 h-16"}`}
          >
            {!isExpanded && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#6C63FF] rounded-full flex items-center justify-center animate-bounce z-10">
                <MessageCircle className="w-3 h-3 text-white" />
              </div>
            )}
            <div className="w-full h-full bg-[#16132F] rounded-full border-2 border-[#6C63FF]/50 p-1 overflow-hidden shadow-2xl">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <ellipse cx="100" cy="120" rx="45" ry="55" fill="#B45309" />
                <circle cx="100" cy="70" r="35" fill="#B45309" />
                <circle cx="85" cy="65" r="4" fill="black" />
                <circle cx="115" cy="65" r="4" fill="black" />
                <circle cx="100" cy="80" r="8" fill="#FDE68A" />
                <circle cx="100" cy="78" r="3" fill="#000" />
              </svg>
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
