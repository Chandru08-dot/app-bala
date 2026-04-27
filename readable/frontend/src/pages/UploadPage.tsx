import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export const UploadPage = () => {
  const [title, setTitle] = useState("");
  const [rawText, setRawText] = useState("");
  const [studentId, setStudentId] = useState("student-1");
  const [isUploading, setIsUploading] = useState(false);
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  const [uploadedLessonId, setUploadedLessonId] = useState<string | null>(null);
  const [personalizedId, setPersonalizedId] = useState<string | null>(null);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    setTimeout(() => {
      setIsUploading(false);
      setUploadedLessonId("lesson-new");
      toast.success("Lesson uploaded successfully! (Mock)");
    }, 1500);
  };

  const handlePersonalize = () => {
    setIsPersonalizing(true);
    
    setTimeout(() => {
      setIsPersonalizing(false);
      setPersonalizedId("content-new");
      toast.success("Lesson personalized for student! (Mock)");
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]"
    >
      <form
        className="rounded-[2.5rem] border border-white/10 bg-[#16132F]/80 p-8 shadow-2xl backdrop-blur-xl"
        onSubmit={handleUpload}
      >
        <p className="text-sm font-bold uppercase tracking-widest text-[#43CBFF]">Teacher Tools</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Upload a lesson</h1>
        
        <div className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-300">Title</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-[#1E1B4B] px-5 py-4 text-white shadow-sm outline-none transition focus:border-[#43CBFF] focus:ring-2 focus:ring-[#43CBFF]/20"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. The Solar System"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-300">Paste text</span>
            <textarea
              rows={8}
              className="w-full rounded-2xl border border-white/10 bg-[#1E1B4B] px-5 py-4 text-white shadow-sm outline-none transition focus:border-[#43CBFF] focus:ring-2 focus:ring-[#43CBFF]/20"
              value={rawText}
              onChange={(event) => setRawText(event.target.value)}
              placeholder="Paste lesson content here..."
            />
          </label>
        </div>
        
        <button
          type="submit"
          disabled={isUploading || !title || !rawText}
          className="mt-8 w-full rounded-full bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] px-6 py-4 text-base font-bold tracking-wide text-white shadow-[0_4px_14px_rgba(108,99,255,0.35)] transition hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : "Upload Lesson (Mock)"}
        </button>
      </form>

      <section className="rounded-[2.5rem] border border-white/10 bg-[#16132F]/80 p-8 shadow-2xl backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-white">Personalize for a student</h2>
        <p className="mt-3 text-slate-400">
          After uploading, generate a personalized copy and open it in the student reading flow.
        </p>
        
        <div className="mt-8 space-y-5">
          <div className="rounded-[1.5rem] bg-[#1E1B4B] p-5 border border-white/5">
            <p className="text-sm font-medium text-slate-400">Uploaded lesson ID</p>
            <p className="mt-2 text-3xl font-bold text-white">
              {uploadedLessonId ?? "--"}
            </p>
          </div>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-300">Student ID</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-[#1E1B4B] px-5 py-4 text-white shadow-sm outline-none transition focus:border-[#43CBFF] focus:ring-2 focus:ring-[#43CBFF]/20"
              value={studentId}
              onChange={(event) => setStudentId(event.target.value)}
            />
          </label>
        </div>
        
        <button
          type="button"
          disabled={!uploadedLessonId || isPersonalizing}
          onClick={handlePersonalize}
          className="mt-8 w-full rounded-full bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] px-6 py-4 text-base font-bold tracking-wide text-white shadow-[0_4px_14px_rgba(108,99,255,0.35)] transition hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPersonalizing ? "Personalizing..." : "Create Personalized Copy"}
        </button>
        
        {personalizedId && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-[1.5rem] border border-[#43E97B]/30 bg-[#43E97B]/10 p-5 text-sm font-medium leading-relaxed text-white"
          >
            Personalized content created for student {studentId}.{" "}
            <Link
              className="font-bold text-[#43E97B] hover:underline block mt-2"
              to={`/lesson/lesson-1`}
            >
              Open lesson preview →
            </Link>
          </motion.div>
        )}
      </section>
    </motion.div>
  );
};
