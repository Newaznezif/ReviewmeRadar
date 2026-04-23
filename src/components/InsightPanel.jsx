import React from 'react';
import { Lightbulb, Target, ArrowRight } from 'lucide-react';

const InsightPanel = ({ results }) => {
  const topSkill = results.top3[0];
  const lowSkill = results.bottom3[0];

  return (
    <div className="glass rounded-3xl p-8 space-y-8">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-emerald-500/10 rounded-xl">
          <Lightbulb className="text-emerald-400 w-6 h-6" />
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2 text-[var(--text-color)]">Core Strength</h4>
          <p className="text-[var(--text-color)] opacity-70 leading-relaxed">
            Your strongest capability is <span className="text-emerald-400 font-medium">{topSkill.name}</span>. 
            Leverage this to differentiate yourself and build momentum in your ventures.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="p-3 bg-rose-500/10 rounded-xl">
          <Target className="text-rose-400 w-6 h-6" />
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-2 text-[var(--text-color)]">Main Growth Gap</h4>
          <p className="text-[var(--text-color)] opacity-70 leading-relaxed">
            Your primary development area is <span className="text-rose-400 font-medium">{lowSkill.name}</span>. 
            This could be a bottleneck as you scale your operations.
          </p>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-200 dark:border-white/5">
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">Focus Recommendation</h4>
        <div className="flex items-center gap-3 text-brand-400">
          <span className="text-sm">Improve your weakest 2 categories first to create a solid foundation.</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default InsightPanel;
