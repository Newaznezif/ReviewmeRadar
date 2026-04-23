import React, { useState } from 'react';
import { Edit2, Check } from 'lucide-react';

const SliderInput = ({ label, value, onChange, onRename, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempLabel, setTempLabel] = useState(label);

  const handleSave = () => {
    onRename(tempLabel);
    setIsEditing(false);
  };

  return (
    <div className="space-y-4 p-6 glass rounded-2xl transition-all hover:border-brand-500/50">
      <div className="flex justify-between items-center gap-4">
        {isEditing ? (
          <div className="flex items-center gap-2 flex-1">
            <input
              type="text"
              value={tempLabel}
              onChange={(e) => setTempLabel(e.target.value)}
              className="bg-[var(--bg-color)] text-[var(--text-color)] text-sm px-2 py-1 rounded border border-brand-500/50 w-full focus:outline-none"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
            <button onClick={handleSave} className="text-emerald-500 p-1 hover:bg-emerald-500/10 rounded">
              <Check className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <label htmlFor={id} className="text-sm font-medium text-[var(--text-color)] opacity-90 truncate">
              {label}
            </label>
            <button 
              onClick={() => setIsEditing(true)} 
              className="text-slate-500 hover:text-brand-400 p-1 hover:bg-white/5 rounded transition-colors"
              title="Rename Category"
            >
              <Edit2 className="w-3 h-3" />
            </button>
          </div>
        )}
        <span className="text-lg font-bold text-brand-400 shrink-0">{value}</span>
      </div>
      <input
        type="range"
        id={id}
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-300 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
      />
      <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-widest">
        <span>Novice</span>
        <span>Expert</span>
      </div>
    </div>
  );
};

export default SliderInput;
