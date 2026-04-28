import React, { useState } from "react";
import { Upload, FileText, Settings, Sparkles, Layout, Save, CheckCircle } from "lucide-react";
import { MOCK_STUDENTS } from "../data/mockData";

export const LessonWorkshopPage = () => {
  const [title, setTitle] = useState("");
  const [rawText, setRawText] = useState("");
  const [targetStudent, setTargetStudent] = useState("all");
  const [isGenerating, setIsGenerating] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setSuccess(true);
    }, 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">AI Authoring Lab</h1>
          <p className="text-slate-500 font-bold mt-1">Upload source material and generate adapted lessons.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6 bg-white">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" />
              Source Content
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Lesson Title</label>
                <input 
                  type="text" 
                  className="input-field"
                  placeholder="Enter a descriptive title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="block text-sm font-bold text-slate-700">Raw Text or Paste Content</label>
                  <button className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:text-indigo-700">
                    <Upload className="w-3 h-3" /> Upload PDF/Image
                  </button>
                </div>
                <textarea 
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all h-64 resize-none"
                  placeholder="Paste article, story, or worksheet text here..."
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="space-y-6">
          <div className="card p-6 bg-slate-900 text-white shadow-xl">
            <h2 className="text-lg font-black mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-indigo-400" />
              Adaptation Settings
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-indigo-200 uppercase tracking-widest mb-2">Target Audience</label>
                <select 
                  value={targetStudent}
                  onChange={(e) => setTargetStudent(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-indigo-400 rounded-xl font-bold text-white focus:outline-none focus:border-white transition-colors appearance-none"
                >
                  <option value="all" className="text-slate-900">All Students (Auto-split)</option>
                  {MOCK_STUDENTS.map(s => (
                    <option key={s.student_id} value={s.student_id} className="text-slate-900">{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Layout className="w-4 h-4 text-emerald-400" /> Output Formats
                </h4>
                <ul className="text-xs text-indigo-200 space-y-2 font-medium">
                  <li>• Segmented chunks</li>
                  <li>• Extracted phonics rules</li>
                  <li>• Auto-generated story map</li>
                  <li>• Difficulty adjusted to target</li>
                </ul>
              </div>

              {!success ? (
                <button 
                  onClick={handleGenerate}
                  disabled={!title || !rawText || isGenerating}
                  className="w-full py-4 bg-indigo-500 text-white font-black rounded-xl hover:bg-indigo-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGenerating ? <Sparkles className="w-5 h-5 animate-pulse" /> : <Sparkles className="w-5 h-5" />}
                  {isGenerating ? 'ADAPTING LESSON...' : 'GENERATE ADAPTATIONS'}
                </button>
              ) : (
                <div className="p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-center">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-white">Lesson Successfully Generated!</p>
                  <button onClick={() => setSuccess(false)} className="text-xs text-emerald-200 underline mt-2 hover:text-white">Create Another</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
