import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.5 }}
          className="fixed bottom-8 right-8 z-50 flex items-end gap-4"
        >
          {/* Speech Bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative mb-12 max-w-xs rounded-3xl bg-white p-6 text-slate-800 shadow-2xl"
          >
            <p className="text-lg font-bold leading-tight">{message}</p>
            {/* Bubble Tail */}
            <div className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 bg-white" />
          </motion.div>

          {/* Squirrel Character */}
          <div className="relative h-48 w-48">
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: isHappy ? [0, 2, -2, 0] : 0
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="h-full w-full"
            >
              <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-2xl">
                {/* Tail */}
                <motion.path
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  d="M160,140 C190,100 180,40 130,30 C100,25 90,60 110,80"
                  fill="none"
                  stroke="#D97706"
                  strokeWidth="24"
                  strokeLinecap="round"
                />
                {/* Body */}
                <ellipse cx="100" cy="120" rx="45" ry="55" fill="#B45309" />
                {/* Head */}
                <circle cx="100" cy="70" r="35" fill="#B45309" />
                {/* Ears */}
                <path d="M75,45 L65,15 L90,35 Z" fill="#92400E" />
                <path d="M125,45 L135,15 L110,35 Z" fill="#92400E" />
                {/* Eyes */}
                <motion.circle 
                  animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  cx="85" cy="65" r="4" fill="black" 
                />
                <motion.circle 
                  animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  cx="115" cy="65" r="4" fill="black" 
                />
                {/* Nose/Muzzle */}
                <circle cx="100" cy="80" r="8" fill="#FDE68A" />
                <circle cx="100" cy="78" r="3" fill="#000" />
                {/* Hands */}
                <circle cx="70" cy="120" r="8" fill="#92400E" />
                <circle cx="130" cy="120" r="8" fill="#92400E" />
                {/* Acorn */}
                {isHappy && (
                  <motion.g
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="origin-center"
                  >
                    <path d="M90,115 C90,130 110,130 110,115 L110,110 L90,110 Z" fill="#78350F" />
                    <rect x="88" y="105" width="24" height="6" rx="3" fill="#A16207" />
                  </motion.g>
                )}
              </svg>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
