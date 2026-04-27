import React from "react";
import { motion } from "framer-motion";

export const PhoneticMouth = ({ phoneme }: { phoneme: string }) => {
  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-[#16132F] rounded-[2.5rem] border border-white/5 shadow-2xl">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Animated Mouth SVG Placeholder */}
        <motion.svg 
          viewBox="0 0 100 100" 
          className="w-full h-full fill-none stroke-[#6C63FF] stroke-[2]"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        >
          {/* Outer Lips */}
          <motion.path 
            d="M20,50 Q50,80 80,50 Q50,60 20,50" 
            animate={{ d: phoneme === "/th/" ? "M20,50 Q50,70 80,50 Q50,60 20,50" : "M20,50 Q50,80 80,50 Q50,60 20,50" }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
          />
          {/* Teeth/Tongue */}
          {phoneme === "/th/" && (
            <motion.path 
              d="M40,55 Q50,65 60,55" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="stroke-[#43CBFF]"
            />
          )}
        </motion.svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-black text-white/10 select-none uppercase">{phoneme}</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-black text-white mb-1 uppercase tracking-widest">Visual Guide</p>
        <p className="text-xs text-slate-500 font-bold">Place tongue behind upper teeth</p>
      </div>
    </div>
  );
};
