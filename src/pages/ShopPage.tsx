import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Coins, Sparkles, Check, Lock } from "lucide-react";
import toast from "react-hot-toast";

const INITIAL_ITEMS = [
  { id: 1, name: "Neon Suit", price: 1200, category: "Skins", image: "👕", owned: true },
  { id: 2, name: "Space Helmet", price: 850, category: "Hat", image: "👨‍🚀", owned: false },
  { id: 3, name: "Jetpack", price: 2500, category: "Back", image: "🚀", owned: false },
  { id: 4, name: "Galaxy Trail", price: 500, category: "Effect", image: "✨", owned: false },
];

export const ShopPage = () => {
  const [coins, setCoins] = useState(4250);
  const [items, setItems] = useState(INITIAL_ITEMS);

  const buyItem = (item: any) => {
    if (item.owned) return;
    if (coins < item.price) {
      toast.error("Not enough Galaxy Coins!");
      return;
    }
    
    setCoins(prev => prev - item.price);
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, owned: true } : i));
    toast.success(`Unlocked ${item.name}!`, {
      icon: "🎉",
      style: { borderRadius: '1rem', background: '#16132F', color: '#fff', border: '1px solid #6C63FF' }
    });
  };

  return (
    <div className="flex flex-col gap-8 p-6 pt-12 pb-32">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white">Galaxy Shop</h1>
          <p className="text-slate-400 font-bold">Gear up for your next mission!</p>
        </div>
        <motion.div 
          key={coins}
          initial={{ scale: 1.2, color: "#facc15" }}
          animate={{ scale: 1, color: "#facc15" }}
          className="bg-yellow-400/10 border border-yellow-400/20 rounded-full px-4 py-2 flex items-center gap-2"
        >
          <Coins className="w-5 h-5 text-yellow-400" />
          <span className="font-black text-yellow-400">{coins.toLocaleString()}</span>
        </motion.div>
      </header>

      <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
        {["All", "Skins", "Hats", "Effects"].map((cat, i) => (
          <button 
            key={cat}
            onClick={() => toast(`Filtering by ${cat}...`)}
            className={`px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap transition ${
              i === 0 ? "bg-[#43CBFF] text-slate-900" : "bg-white/5 text-slate-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <motion.div 
            key={item.id}
            whileTap={{ scale: 0.95 }}
            className="bg-[#16132F] rounded-[2rem] p-6 border border-white/5 relative flex flex-col items-center"
          >
            <motion.div 
              animate={item.owned ? { rotate: [0, 10, -10, 0] } : {}}
              className="text-5xl mb-4"
            >
              {item.image}
            </motion.div>
            <h3 className="text-sm font-black text-white mb-1">{item.name}</h3>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">{item.category}</p>
            
            <button 
              onClick={() => buyItem(item)}
              className={`w-full py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition active:scale-90 ${
                item.owned 
                ? "bg-white/5 text-slate-500 cursor-default" 
                : "bg-white text-slate-900"
              }`}
            >
              {item.owned ? (
                <>
                  <Check className="w-4 h-4" /> OWNED
                </>
              ) : (
                <>
                  <Coins className="w-4 h-4" /> {item.price}
                </>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      <section className="bg-[#16132F] rounded-[2rem] p-6 border border-[#6C63FF]/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#6C63FF22_0%,transparent_70%)]" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-purple-500/20 text-purple-500">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-black text-white">Daily Special</h3>
          </div>
          <p className="text-sm text-slate-400 mb-6">Unlock all level 1 skins with this exclusive pack!</p>
          <button 
            onClick={() => toast.success("Mega Pack Acquired!")}
            className="w-full bg-[linear-gradient(135deg,#A855F7_0%,#3B82F6_100%)] py-4 rounded-2xl font-black text-white shadow-xl active:scale-95 transition"
          >
            BUY MEGA PACK
          </button>
        </div>
      </section>
    </div>
  );
};
