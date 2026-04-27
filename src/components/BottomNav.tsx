import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Compass, Trophy, ShoppingBag, Award, Mic, Activity } from "lucide-react";

export const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Compass, label: "Expedition", path: "/expedition" },
    { icon: Mic, label: "Training", path: "/training" },
    { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
    { icon: Activity, label: "Telemetry", path: "/telemetry" },
    { icon: ShoppingBag, label: "Shop", path: "/shop" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-around border-t border-white/5 bg-[#16132F]/80 px-4 pb-2 backdrop-blur-xl">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? "text-[#43CBFF]" : "text-slate-400 hover:text-white"
            }`}
          >
            <item.icon className={`h-6 w-6 ${isActive ? "drop-shadow-[0_0_8px_rgba(67,203,255,0.5)]" : ""}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
