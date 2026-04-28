import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Maximize, Play, Settings2, Moon, Sun, Type, AlignLeft } from "lucide-react";

export const ReaderPage = () => {
  const [theme, setTheme] = useState<'light' | 'cream' | 'dark'>('cream');
  const [fontSize, setFontSize] = useState(24);
  const [bionic, setBionic] = useState(false);

  const themeClasses = {
    light: "bg-white text-slate-900",
    cream: "bg-[#FFFDD0] text-slate-900",
    dark: "bg-slate-900 text-slate-100"
  };

  const sampleText = `The quick brown fox jumps over the lazy dog. This is a classic sentence used to test reading and typography because it contains every letter in the English alphabet. When practicing reading skills, it is helpful to have distraction-free environments where you can focus entirely on the text without extra UI elements getting in the way.`;

  const formatWord = (word: string, index: number) => {
    if (bionic) {
      const mid = Math.ceil(word.length / 2);
      return (
        <span key={index} className="inline-block mr-2">
          <b className={`font-black ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{word.slice(0, mid)}</b>
          <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>{word.slice(mid)}</span>
        </span>
      );
    }
    return <span key={index} className="inline-block mr-2">{word}</span>;
  };

  return (
    <div className={`fixed inset-0 z-50 flex flex-col transition-colors duration-500 ${themeClasses[theme]} animate-in fade-in duration-300`}>
      {/* Top Bar */}
      <div className={`h-16 flex items-center justify-between px-6 border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200/50'}`}>
        <div className="flex items-center gap-4">
          <Link to="/student" className={`p-2 rounded-xl transition-colors ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-black/5'}`}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="font-bold opacity-50">Reader Mode</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`flex bg-black/5 p-1 rounded-xl ${theme === 'dark' ? 'bg-white/10' : ''}`}>
            <button onClick={() => setTheme('light')} className={`p-2 rounded-lg ${theme === 'light' ? 'bg-white shadow-sm' : ''}`}><Sun className="w-4 h-4" /></button>
            <button onClick={() => setTheme('cream')} className={`p-2 rounded-lg ${theme === 'cream' ? 'bg-white shadow-sm' : ''}`}><div className="w-4 h-4 rounded-full bg-[#F5DEB3]"></div></button>
            <button onClick={() => setTheme('dark')} className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-slate-800 shadow-sm text-white' : ''}`}><Moon className="w-4 h-4" /></button>
          </div>
          
          <button onClick={() => setBionic(!bionic)} className={`p-2 rounded-xl font-bold text-sm ${bionic ? 'bg-indigo-500 text-white' : 'bg-black/5 hover:bg-black/10'}`}>
            Bionic
          </button>
          
          <button className={`p-2 rounded-xl hover:bg-black/5 ${theme === 'dark' ? 'hover:bg-slate-800' : ''}`}>
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Reader Content */}
      <div className="flex-1 overflow-y-auto p-12 lg:p-24">
        <div className="max-w-3xl mx-auto">
          <p 
            className="font-medium leading-[2.5] transition-all" 
            style={{ fontSize: `${fontSize}px` }}
          >
            {sampleText.split(" ").map((w, i) => formatWord(w, i))}
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`h-20 flex justify-center items-center gap-6 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200/50'}`}>
        <button onClick={() => setFontSize(Math.max(16, fontSize - 2))} className="p-3 rounded-full hover:bg-black/5"><Type className="w-4 h-4" /></button>
        <span className="text-xs font-bold opacity-50 uppercase tracking-widest">{fontSize}px</span>
        <button onClick={() => setFontSize(Math.min(48, fontSize + 2))} className="p-3 rounded-full hover:bg-black/5"><Type className="w-6 h-6" /></button>
      </div>
    </div>
  );
};
