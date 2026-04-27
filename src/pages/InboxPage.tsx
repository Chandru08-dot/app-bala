import React from "react";
import { motion } from "framer-motion";
import { Mail, Bell, MessageSquare, ChevronRight, Info } from "lucide-react";
import toast from "react-hot-toast";

const MESSAGES = [
  { id: 1, from: "Squirrel Guide", text: "Don't forget your daily mission! Mars is waiting for you. 🐿️", time: "10m ago", read: false, icon: Info, color: "#43CBFF" },
  { id: 2, from: "Mission Control", text: "Your reading stability report for Earth Station is ready.", time: "2h ago", read: true, icon: Bell, color: "#A855F7" },
  { id: 3, from: "Teacher Thompson", text: "I've assigned a new challenge for you: 'The Great Galaxy Read'.", time: "1d ago", read: true, icon: MessageSquare, color: "#6C63FF" },
];

export const InboxPage = () => {
  const [messages, setMessages] = React.useState(MESSAGES);

  const readMessage = (id: number) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
    const msg = messages.find(m => m.id === id);
    toast(msg?.text || "Message read", {
      icon: "✉️",
      duration: 4000,
      style: { borderRadius: '1.5rem', background: '#16132F', color: '#fff', border: '1px solid #6C63FF' }
    });
  };

  return (
    <div className="flex flex-col gap-8 p-6 pt-12 pb-32">
      <header>
        <h1 className="text-3xl font-black text-white">Inbox</h1>
        <p className="text-slate-400 font-bold">You have {messages.filter(m => !m.read).length} new messages!</p>
      </header>

      <div className="space-y-4">
        {messages.map((msg) => (
          <motion.div 
            key={msg.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => readMessage(msg.id)}
            className={`bg-[#16132F] rounded-[2rem] p-6 border border-white/5 flex items-center gap-6 relative transition cursor-pointer active:border-[#43CBFF] ${
              !msg.read ? "ring-2 ring-[#43CBFF]/30 bg-[#1E1B4B]" : ""
            }`}
          >
            {!msg.read && (
              <div className="absolute top-6 left-6 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#43CBFF] rounded-full shadow-[0_0_10px_#43CBFF]" />
            )}
            
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${msg.color}22`, color: msg.color }}
            >
              <msg.icon className="w-7 h-7" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-black text-white">{msg.from}</h3>
                <span className="text-[10px] font-bold text-slate-500">{msg.time}</span>
              </div>
              <p className={`text-xs truncate ${msg.read ? "text-slate-500" : "text-slate-300 font-medium"}`}>
                {msg.text}
              </p>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-500" />
          </motion.div>
        ))}
      </div>

      <section className="bg-[#1E1B4B] rounded-[2.5rem] p-8 border border-white/5 flex items-center justify-between">
        <div>
          <h3 className="font-black text-white mb-1">Mission Alerts</h3>
          <p className="text-xs text-slate-400">Get notified about new quests!</p>
        </div>
        <div className="w-12 h-6 bg-[#43CBFF] rounded-full relative p-1 cursor-pointer">
          <div className="w-4 h-4 bg-white rounded-full absolute right-1" />
        </div>
      </section>
    </div>
  );
};
