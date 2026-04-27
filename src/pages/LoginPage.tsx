import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import { authStore } from "../stores/authStore";
import { MOCK_USERS } from "../data/mockData";
import { BiometricSplash } from "../components/BiometricSplash";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("student@test.com");
  const storeLogin = authStore((state) => state.login);
  const [isPending, setIsPending] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    setTimeout(() => {
      setIsPending(false);
      setShowSplash(true);
    }, 800);
  };

  const onSplashComplete = () => {
    const isTeacher = email.includes("teacher");
    const user = isTeacher ? MOCK_USERS.teacher : MOCK_USERS.student;
    storeLogin(user);
    toast.success("Welcome back!");
    navigate("/dashboard");
  };

  if (showSplash) return <BiometricSplash onComplete={onSplashComplete} />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#0D0B1E_0%,#1E1B4B_100%)] px-4 py-12">
      <div className="grid w-full max-w-5xl gap-8 lg:grid-cols-[1.2fr,0.8fr] items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center p-8"
        >
          <motion.div 
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
            className="mb-8 flex h-32 w-32 items-center justify-center rounded-[2rem] bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] text-6xl font-bold text-white shadow-[0_12px_24px_rgba(108,99,255,0.4)]"
          >
            R
          </motion.div>
          
          <h1 className="text-5xl font-extrabold tracking-tight text-white">
            Welcome to <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)]">Readable</span>
          </h1>
          <p className="mt-4 max-w-md text-lg font-medium text-slate-300">
            A fully static, premium frontend reading experience. Select a demo account to explore!
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: 0.1 }}
          className="flex flex-col justify-center rounded-[2.5rem] border border-white/10 bg-[#16132F]/80 p-10 shadow-2xl backdrop-blur-xl"
          onSubmit={handleLogin}
        >
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] text-2xl font-bold text-white shadow-lg">
              R
            </div>
          </div>
          <h2 className="text-center text-3xl font-bold text-white">Sign In</h2>
          <p className="mt-2 text-center text-sm font-medium text-slate-400">
            (No backend required)
          </p>
          
          <div className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-300">Demo Account</span>
              <select
                className="w-full rounded-2xl border border-white/10 bg-[#1E1B4B] px-5 py-4 text-white shadow-sm outline-none transition focus:border-[#43CBFF] focus:ring-2 focus:ring-[#43CBFF]/20 appearance-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              >
                <option value="student@test.com">Student Demo (student@test.com)</option>
                <option value="teacher@test.com">Teacher Demo (teacher@test.com)</option>
              </select>
            </label>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isPending}
            className="mt-8 w-full rounded-full bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] px-4 py-4 text-lg font-bold tracking-wide text-white shadow-[0_6px_20px_rgba(108,99,255,0.35)] transition disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
          >
            {isPending ? "Entering..." : "Start Exploring"}
          </motion.button>
          
          <p className="mt-6 text-center text-sm font-bold text-slate-400">
            This is a 100% static demonstration.
          </p>
        </motion.form>
      </div>
    </div>
  );
};
