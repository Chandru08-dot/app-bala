import React from "react";
import { motion } from "framer-motion";

export const CosmicBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep Space Base */}
      <div className="absolute inset-0 bg-[#0D0B1E]" />
      
      {/* Nebula 1 */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_30%_30%,#6C63FF33_0%,transparent_50%)] blur-[100px]"
      />

      {/* Nebula 2 */}
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -15, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[20%] -right-[20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_70%_70%,#43CBFF22_0%,transparent_50%)] blur-[100px]"
      />

      {/* Twinkling Stars */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            opacity: [0.1, 0.8, 0.1],
            scale: [1, 1.5, 1]
          }}
          transition={{ 
            duration: Math.random() * 3 + 2, 
            repeat: Infinity,
            delay: Math.random() * 5 
          }}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            boxShadow: '0 0 10px rgba(255,255,255,0.8)'
          }}
        />
      ))}
    </div>
  );
};
