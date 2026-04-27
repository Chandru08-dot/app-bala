import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Type, Palette, Eye, Settings2, Check } from "lucide-react";
import { useSettings } from "../stores/settingsStore";

const OVERLAYS = [
  { id: 'none', color: 'transparent', label: 'None' },
  { id: 'cream', color: 'rgba(255, 253, 208, 0.15)', label: 'Cream' },
  { id: 'yellow', color: 'rgba(255, 255, 0, 0.1)', label: 'Yellow' },
  { id: 'blue', color: 'rgba(0, 0, 255, 0.05)', label: 'Blue' },
];

export const DyslexiaToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { fontFamily, setFontFamily, letterSpacing, setLetterSpacing } = useSettings();
  const [activeOverlay, setActiveOverlay] = useState('none');
  const [showRuler, setShowRuler] = useState(false);

  return (
    <>
      {/* Global Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9998] transition-colors duration-500" 
        style={{ backgroundColor: OVERLAYS.find(o => o.id === activeOverlay)?.color }}
      />

      {/* Reading Ruler */}
      {showRuler && (
        <motion.div 
          drag="y"
          dragConstraints={{ top: 0, bottom: window.innerHeight }}
          className="fixed left-0 right-0 h-16 bg-black/20 backdrop-blur-[2px] border-y-2 border-yellow-400/50 z-[9997] cursor-ns-resize pointer-events-auto"
          style={{ top: '30%' }}
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-[10px] px-2 py-0.5 rounded font-black text-slate-900 uppercase">
            Reading Ruler
          </div>
        </motion.div>
      )}

      <div className="fixed top-6 right-6 z-[10000] flex flex-col items-end gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-[#6C63FF] shadow-2xl flex items-center justify-center text-white border-2 border-white/20"
        >
          <Settings2 className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              className="bg-[#16132F] rounded-[2.5rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 w-72"
            >
              <div className="space-y-6">
                {/* Font Toggle */}
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Dyslexia Font</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => { setFontFamily('Inter'); setLetterSpacing(0); }}
                      className={`py-3 rounded-xl text-xs font-bold border transition ${fontFamily === 'Inter' ? 'bg-[#6C63FF] border-[#6C63FF] text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}
                    >
                      Standard
                    </button>
                    <button 
                      onClick={() => { setFontFamily('OpenDyslexic'); setLetterSpacing(2); }}
                      className={`py-3 rounded-xl text-xs font-bold border transition ${fontFamily === 'OpenDyslexic' ? 'bg-[#6C63FF] border-[#6C63FF] text-white' : 'bg-white/5 border-white/10 text-slate-400'}`}
                    >
                      Dyslexic
                    </button>
                  </div>
                </div>

                {/* Overlays */}
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Color Overlay</label>
                  <div className="flex gap-2 justify-between">
                    {OVERLAYS.map(o => (
                      <button
                        key={o.id}
                        onClick={() => setActiveOverlay(o.id)}
                        className={`w-10 h-10 rounded-full border-2 transition flex items-center justify-center ${activeOverlay === o.id ? 'border-white' : 'border-transparent'}`}
                        style={{ backgroundColor: o.id === 'none' ? '#333' : o.color.replace('0.15', '1').replace('0.1', '1').replace('0.05', '1') }}
                      >
                        {activeOverlay === o.id && <Check className="w-4 h-4 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ruler Toggle */}
                <button 
                  onClick={() => setShowRuler(!showRuler)}
                  className={`w-full py-4 rounded-2xl border-2 flex items-center justify-center gap-3 font-black text-xs transition ${showRuler ? 'bg-yellow-400 border-yellow-400 text-slate-900' : 'bg-white/5 border-white/10 text-slate-400'}`}
                >
                  <Eye className="w-4 h-4" />
                  {showRuler ? 'HIDE RULER' : 'SHOW READING RULER'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
