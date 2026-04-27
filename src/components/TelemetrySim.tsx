import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const GazeTracker = () => {
  const [position, setPosition] = useState({ x: 200, y: 300 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: 100 + Math.random() * 200,
        y: 200 + Math.random() * 400
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      animate={{ x: position.x, y: position.y }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="fixed pointer-events-none z-[200] w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center backdrop-blur-sm"
    >
      <div className="w-1 h-1 bg-blue-500 rounded-full" />
      <div className="absolute inset-0 animate-ping rounded-full bg-blue-500/10" />
    </motion.div>
  );
};

export const AudioWaveform = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="flex items-end gap-1 h-12">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ height: isActive ? [10, 48, 15, 40, 10] : 10 }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
          className="w-1.5 bg-blue-500 rounded-full"
        />
      ))}
    </div>
  );
};
