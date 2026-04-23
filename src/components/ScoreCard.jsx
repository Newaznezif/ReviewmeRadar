import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const ScoreCard = ({ title, items, type = 'strength' }) => {
  const isStrength = type === 'strength';
  
  return (
    <div className="glass rounded-2xl p-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        {isStrength ? (
          <TrendingUp className="text-emerald-400 w-5 h-5" />
        ) : (
          <TrendingDown className="text-rose-400 w-5 h-5" />
        )}
        <h3 className="text-lg font-semibold text-[var(--text-color)]">{title}</h3>
      </div>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={item.id} className="flex justify-between items-center">
            <span className="text-sm text-[var(--text-color)] opacity-70">{item.name}</span>
            <span className={`text-sm font-bold ${isStrength ? 'text-emerald-400' : 'text-rose-400'}`}>
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreCard;
