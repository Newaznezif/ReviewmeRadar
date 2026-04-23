import { motion, AnimatePresence } from 'framer-motion';
import SliderInput from '../components/SliderInput';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

const AssessmentPage = ({ categories, scores, userName, setUserName, wheelName, setWheelName, onScoreChange, onRenameCategory, onComplete, onBack }) => {
  return (
    <div className="min-h-screen py-20 px-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-900 px-4 py-1.5 rounded-full border border-slate-300 dark:border-white/5">
          Step 1 of 1 • Skills Assessment
        </div>
      </div>

      <header className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-[var(--text-color)]">Rate Your Entrepreneurial Skills</h2>
        <p className="opacity-70">Be honest with yourself. This assessment is for your own growth and awareness.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {categories.map((category) => (
          <SliderInput
            key={category.id}
            id={category.id}
            label={category.name}
            value={scores[category.id] || 0}
            onChange={(val) => onScoreChange(category.id, val)}
            onRename={(newName) => onRenameCategory(category.id, newName)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-6 py-4 bg-white/5 border border-slate-300 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 text-[var(--text-color)] font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Wheel Name</label>
            <input
              type="text"
              placeholder="e.g., Entrepreneur Wheel"
              value={wheelName}
              onChange={(e) => setWheelName(e.target.value)}
              className="w-full px-6 py-4 bg-white/5 border border-slate-300 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 text-[var(--text-color)] font-medium"
            />
          </div>
        </div>
        
        <div className="flex justify-center pt-4">
          <button
            onClick={onComplete}
            className="w-full md:w-auto px-16 py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-3"
          >
            Generate My Profile
            <CheckCircle2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
