import React, { useState, useEffect } from 'react';
import { Sun, Moon, LinkedinIcon as Linkedin, Globe, ExternalLink } from 'lucide-react';
import LandingPage from './pages/LandingPage';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';
import { CATEGORIES as INITIAL_CATEGORIES } from './utils/scoringLogic';

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [scores, setScores] = useState(
    INITIAL_CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat.id]: 50 }), {})
  );
  const [userName, setUserName] = useState('Newaz Nezif');
  const [wheelName, setWheelName] = useState('Entrepreneur Profile');

  const handleRenameCategory = (id, newName) => {
    setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, name: newName } : cat));
  };
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleScoreChange = (id, value) => {
    setScores((prev) => ({ ...prev, [id]: value }));
  };

  const handleRestart = () => {
    setScores(INITIAL_CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat.id]: 50 }), {}));
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300">
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-full glass hover:scale-110 transition-transform cursor-pointer"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
      </button>

      {currentPage === 'landing' && (
        <LandingPage onStart={() => setCurrentPage('assessment')} />
      )}
      
      {currentPage === 'assessment' && (
        <AssessmentPage
          categories={categories}
          scores={scores}
          userName={userName}
          setUserName={setUserName}
          wheelName={wheelName}
          setWheelName={setWheelName}
          onScoreChange={handleScoreChange}
          onRenameCategory={handleRenameCategory}
          onComplete={() => setCurrentPage('results')}
          onBack={() => setCurrentPage('landing')}
        />
      )}

      {currentPage === 'results' && (
        <ResultsPage
          categories={categories}
          scores={scores}
          userName={userName}
          wheelName={wheelName}
          onRestart={handleRestart}
        />
      )}

      <footer className="w-full py-12 px-4 mt-auto border-t border-slate-200 dark:border-white/5 flex flex-col items-center gap-4 text-center relative z-50 bg-[var(--bg-color)]">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Developed by <span className="text-brand-500 font-bold">Newaz Nezif</span> (AI & Cyber Engineer)
        </p>
        <div className="flex items-center gap-6">
          <a 
            href="https://www.linkedin.com/in/newaz-nezif-285439262/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-400 transition-colors cursor-pointer"
          >
            <Linkedin className="w-4 h-4" />
            Connect on LinkedIn
          </a>
          <a 
            href="https://newaznezif.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-400 transition-colors cursor-pointer"
          >
            <Globe className="w-4 h-4" />
            Portfolio
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
