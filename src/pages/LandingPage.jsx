import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Zap, Shield, Target } from 'lucide-react';

const LandingPage = ({ onStart }) => {
  return (
    <div className="min-height-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-[128px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[128px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-brand-500/30 text-brand-400 text-sm font-medium mb-4">
          <Compass className="w-4 h-4" />
          <span>Newazfix version 1.0</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--text-color)] leading-tight">
          Discover Your <span className="gradient-text">Entrepreneur Profile</span>
        </h1>
        
        <p className="text-lg md:text-xl text-[var(--text-color)] opacity-70 max-w-2xl mx-auto leading-relaxed">
          Measure your strengths across key performance areas in under 2 minutes. 
          Get a professional radar analysis of your unique skill profile.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <button
            onClick={onStart}
            style={{ backgroundColor: 'var(--btn-bg)', color: 'var(--btn-text)' }}
            className="group relative px-8 py-4 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] flex items-center gap-2"
          >
            Start Assessment
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>

      <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl w-full">
        {[
          { icon: Zap, label: 'Fast Analysis' },
          { icon: Target, label: 'Precise Logic' },
          { icon: Shield, label: 'Data Privacy' },
          { icon: Compass, label: 'Clear Direction' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400"
          >
            <item.icon className="w-6 h-6" />
            <span className="text-sm font-medium">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
