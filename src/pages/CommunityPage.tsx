import React from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Star, Users } from "lucide-react";

const FEEDS = [
  { id: 1, user: "Ms. Thompson", avatar: "👩‍🏫", text: "Incredible job today, Class 4B! Everyone improved their reading speed by at least 5%!", type: "teacher", time: "2h ago", likes: 24 },
  { id: 2, user: "Leo Chen", avatar: "🦊", text: "I just unlocked the 'Eagle Eye' badge! 100% accuracy on Venus Vault!", type: "achievement", time: "5h ago", likes: 12 },
  { id: 3, user: "Sarah Miller", avatar: "🦁", text: "Look at my new Neon Suit! Just bought it from the shop. 🚀", type: "post", time: "1d ago", likes: 45 },
];

export const CommunityPage = () => {
  return (
    <div className="flex flex-col gap-8 p-6 pt-12 pb-32">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white">Community</h1>
          <p className="text-slate-400 font-bold">Class 4B Explorers</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6C63FF]/10 text-[#6C63FF] border border-[#6C63FF]/20">
          <Users className="w-6 h-6" />
        </div>
      </header>

      <div className="space-y-6">
        {FEEDS.map((post) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#16132F] rounded-[2rem] p-6 border border-white/5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-xl shadow-lg">
                  {post.avatar}
                </div>
                <div>
                  <p className="font-black text-white text-sm">{post.user}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">{post.time}</p>
                </div>
              </div>
              {post.type === "teacher" && (
                <span className="text-[10px] font-black text-[#A855F7] bg-[#A855F7]/10 px-2 py-1 rounded">TEACHER</span>
              )}
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {post.text}
            </p>

            <div className="flex items-center gap-6 text-slate-500">
              <button className="flex items-center gap-2 hover:text-rose-500 transition">
                <Heart className="w-5 h-5" />
                <span className="text-xs font-bold">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-[#43CBFF] transition">
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs font-bold">Reply</span>
              </button>
              <button className="ml-auto hover:text-white transition">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full py-6 rounded-[2rem] bg-white/5 border border-white/10 font-black text-white flex items-center justify-center gap-2">
        <Star className="w-5 h-5 text-yellow-400" />
        SHARE YOUR PROGRESS
      </button>
    </div>
  );
};
