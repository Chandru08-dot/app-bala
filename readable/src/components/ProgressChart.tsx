import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

type ChartData = {
  [key: string]: any;
};

export const ProgressChart = ({ data }: { data: ChartData[] }) => {
  // If no data, render a placeholder
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-2xl border border-white/5 bg-[#1E1B4B]">
        <p className="text-slate-500 font-medium">No session data available</p>
      </div>
    );
  }

  // Format data for the chart (using accuracy and speed)
  const chartData = data.map((d, i) => ({
    name: `Session ${i + 1}`,
    accuracy: d.accuracy_pct || d.accuracy || 0,
    speed: d.speed_wpm || d.speed || 0,
    score: d.attention_score || d.score || 0,
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#43E97B" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#43E97B" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#43CBFF" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#43CBFF" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#94A3B8" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            dy={10}
          />
          <YAxis 
            stroke="#94A3B8" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1E1B4B', 
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
            }}
            itemStyle={{ fontWeight: 'bold' }}
            labelStyle={{ color: '#94A3B8', marginBottom: '4px' }}
          />
          <Area 
            type="monotone" 
            dataKey="accuracy" 
            name="Accuracy (%)"
            stroke="#43E97B" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorAccuracy)" 
          />
          <Area 
            type="monotone" 
            dataKey="speed" 
            name="Speed (WPM)"
            stroke="#43CBFF" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorSpeed)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
