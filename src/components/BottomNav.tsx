import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Activity, User, BookOpen } from "lucide-react";

export const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Layout, label: "Hub", path: "/dashboard" },
    { icon: Activity, label: "Test", path: "/diagnostic" },
    { icon: BookOpen, label: "Learn", path: "/lesson/1" },
    { icon: User, label: "Parent", path: "/parent" },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 flex h-20 w-full max-w-[450px] items-center justify-around border-t border-slate-100 bg-white/90 px-4 pb-2 backdrop-blur-xl">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              isActive ? "text-blue-600 scale-110" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <item.icon className={`h-6 w-6 ${isActive ? "stroke-[3]" : "stroke-[2]"}`} />
            <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? "opacity-100" : "opacity-50"}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
