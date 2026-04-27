import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, Type, MoveVertical, Eye, Ruler, Activity, Star } from "lucide-react";
import { useSettings } from "../stores/settingsStore";

export const DyslexiaToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    fontFamily, setFontFamily, 
    letterSpacing, setLetterSpacing, 
    lineHeight, setLineHeight 
  } = useSettings();

  return (
    <>
      <div className="fixed top-6 right-6 z-[200]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xl text-blue-600 flex items-center gap-3"
        >
          <Activity className="w-6 h-6" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-900 pr-2">Accessibility</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[300] w-full max-w-sm bg-white shadow-2xl border-l border-slate-100 p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-2xl font-[900] text-slate-900 italic tracking-tighter">NeuroSettings</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Medical-Grade Support</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-3 bg-slate-50 rounded-2xl text-slate-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-10">
              {/* Font Selector */}
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Type className="w-4 h-4" /> Reading Surface
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Lexend', 'OpenDyslexic'].map((font) => (
                    <button
                      key={font}
                      onClick={() => setFontFamily(font as any)}
                      className={`py-4 rounded-2xl text-xs font-black transition-all ${
                        fontFamily === font 
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
                          : "bg-slate-50 text-slate-400 border border-slate-100"
                      }`}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spacing Controls */}
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <MoveVertical className="w-4 h-4" /> Neural Spacing
                </label>
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-8">
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Kerning</span>
                      <span className="text-[10px] font-black text-blue-600">{letterSpacing}px</span>
                    </div>
                    <input 
                      type="range" min="0" max="10" step="1" 
                      value={letterSpacing} onChange={(e) => setLetterSpacing(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Baseline</span>
                      <span className="text-[10px] font-black text-blue-600">{lineHeight}</span>
                    </div>
                    <input 
                      type="range" min="1.5" max="3" step="0.1" 
                      value={lineHeight} onChange={(e) => setLineHeight(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Modes */}
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Eye className="w-4 h-4" /> Advanced Assist
                </label>
                <div className="grid grid-cols-1 gap-3">
                   <button className="flex items-center justify-between p-5 bg-blue-50 border border-blue-100 rounded-3xl group">
                      <div className="flex items-center gap-4">
                        <Ruler className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-black text-slate-700">Reading Ruler</span>
                      </div>
                      <div className="w-10 h-6 bg-blue-600 rounded-full relative">
                        <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full" />
                      </div>
                   </button>
                   <button className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-3xl group opacity-60">
                      <div className="flex items-center gap-4">
                        <Star className="w-5 h-5 text-slate-400" />
                        <span className="text-sm font-black text-slate-700">Phonetic Focus</span>
                      </div>
                      <div className="w-10 h-6 bg-slate-200 rounded-full relative">
                        <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full" />
                      </div>
                   </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
