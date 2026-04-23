import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, TrendingUp } from 'lucide-react';

const RoadmapSection = ({ roadmap }) => {
  const icons = [Clock, TrendingUp, CheckCircle];

  return (
    <div className="space-y-6 mt-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-brand-500/20 rounded-lg">
          <TrendingUp className="text-brand-400 w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold">Strategic Roadmap</h3>
      </div>

      <div className="relative pl-8 space-y-12">
        {/* Vertical Line */}
        <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-white/10" />

        {roadmap.map((step, index) => {
          const Icon = icons[index];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Dot */}
              <div className="absolute -left-[25px] p-1.5 bg-[var(--bg-color)]">
                <div className="w-4 h-4 rounded-full bg-brand-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
              </div>

              <div className="glass rounded-2xl p-6 hover:translate-x-2 transition-transform duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">{step.status}</span>
                  <Icon className="w-4 h-4 text-slate-400" />
                </div>
                <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.action}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapSection;
