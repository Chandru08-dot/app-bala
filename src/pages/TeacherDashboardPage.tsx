import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Users, FileText, Upload, BrainCircuit, CheckCircle, ArrowRight, Loader2, Sparkles, User, Settings } from "lucide-react";
import { MOCK_USER, MOCK_STUDENTS, MOCK_OCR_PREVIEW, MOCK_PERSONALIZED_OUTPUTS } from "../data/mockData";

export const TeacherDashboardPage = () => {
  const teacher = MOCK_USER.teacher;
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'ocr' | 'ai' | 'complete'>('idle');
  const [lessonTitle, setLessonTitle] = useState("");

  const handleUpload = () => {
    if (!lessonTitle) return;
    setUploadState('uploading');
    
    // Simulate OCR Extraction
    setTimeout(() => {
      setUploadState('ocr');
      
      // Simulate Groq AI Personalization
      setTimeout(() => {
        setUploadState('ai');
        
        // Complete
        setTimeout(() => {
          setUploadState('complete');
        }, 2000);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Mission Control</h1>
          <p className="text-slate-500 font-bold mt-1">Welcome back, {teacher.name}.</p>
        </div>
        <Link to="/workshop" className="btn-secondary flex items-center gap-2">
          <Settings className="w-5 h-5" />
          LESSON WORKSHOP
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: AI Dispatcher */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card p-6 bg-indigo-600 text-white shadow-xl">
            <h2 className="text-xl font-black mb-4 flex items-center gap-2">
              <BrainCircuit className="w-6 h-6" />
              Lesson Dispatch
            </h2>
            <p className="text-indigo-100 text-sm font-medium mb-6">Upload a generic PDF or text. Our AI will automatically extract it and personalize it for every student's reading level.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-indigo-200 uppercase tracking-widest mb-2">Lesson Title</label>
                <input 
                  type="text" 
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-indigo-400 rounded-xl font-bold text-white placeholder:text-indigo-300 focus:outline-none focus:border-white transition-colors"
                  placeholder="e.g. The Solar System"
                />
              </div>

              {uploadState === 'idle' && (
                <button 
                  onClick={handleUpload}
                  disabled={!lessonTitle}
                  className="w-full py-8 border-2 border-dashed border-indigo-300 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className="w-8 h-8 text-indigo-300" />
                  <span className="font-bold text-sm">Upload PDF or Image</span>
                </button>
              )}

              {uploadState === 'uploading' && (
                <div className="w-full py-8 rounded-2xl bg-white/10 flex flex-col items-center justify-center gap-4">
                  <Loader2 className="w-8 h-8 animate-spin text-white" />
                  <span className="font-bold text-sm">Uploading document...</span>
                </div>
              )}

              {uploadState === 'ocr' && (
                <div className="w-full py-8 rounded-2xl bg-white/10 flex flex-col items-center justify-center gap-4">
                  <FileText className="w-8 h-8 text-amber-300 animate-pulse" />
                  <span className="font-bold text-sm">Extracting text (OCR)...</span>
                </div>
              )}

              {uploadState === 'ai' && (
                <div className="w-full py-8 rounded-2xl bg-white/10 flex flex-col items-center justify-center gap-4">
                  <Sparkles className="w-8 h-8 text-emerald-300 animate-pulse" />
                  <span className="font-bold text-sm text-center px-4">Groq AI personalizing for 3 students...</span>
                </div>
              )}

              {uploadState === 'complete' && (
                <div className="w-full py-8 rounded-2xl bg-emerald-500 flex flex-col items-center justify-center gap-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                  <span className="font-bold text-sm">Dispatch Complete!</span>
                  <button onClick={() => setUploadState('idle')} className="text-xs underline font-bold text-emerald-100">Reset</button>
                </div>
              )}
            </div>
          </div>

          {/* OCR Preview Panel */}
          {(uploadState === 'ocr' || uploadState === 'ai' || uploadState === 'complete') && (
            <div className="card p-6 animate-in slide-in-from-top-4 duration-500">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" /> Raw Extraction
              </h3>
              <div className="p-4 bg-slate-50 rounded-xl font-mono text-xs text-slate-600 h-48 overflow-y-auto border border-slate-200 shadow-inner">
                {MOCK_OCR_PREVIEW}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Roster & AI Outputs */}
        <div className="lg:col-span-2 space-y-8">
          
          {uploadState === 'complete' && (
            <div className="card p-6 border-2 border-emerald-100 bg-emerald-50/50 animate-in fade-in duration-500">
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-500" /> Personalized Outputs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_PERSONALIZED_OUTPUTS.map((output, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold text-slate-900">{output.student_name}</p>
                        <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{output.reading_level}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 font-medium line-clamp-3 mb-4">
                      "{output.content}"
                    </p>
                    <Link to={`/lesson/preview`} className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:gap-2 transition-all">
                      Preview Lesson <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="card overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-500" />
                Student Roster
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Student</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Level</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Accuracy</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {MOCK_STUDENTS.map((student) => (
                    <tr key={student.student_id} className="hover:bg-slate-50 transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                            {student.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{student.name}</p>
                            <p className="text-xs text-slate-500">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="badge bg-indigo-50 text-indigo-700 border border-indigo-100">{student.reading_level}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-black text-emerald-600">{student.avg_accuracy_pct}%</span>
                      </td>
                      <td className="p-4 text-right">
                        <Link to={`/student/${student.student_id}`} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg inline-flex transition-colors">
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
