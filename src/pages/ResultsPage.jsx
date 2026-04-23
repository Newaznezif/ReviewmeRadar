import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { toBlob } from 'html-to-image';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import RadarChart from '../components/RadarChart';
import ScoreCard from '../components/ScoreCard';
import InsightPanel from '../components/InsightPanel';
import { calculateResults } from '../utils/scoringLogic';
import { getArchetype } from '../utils/archetypeLogic';
import { RefreshCw, Download, Share2, Terminal, Sparkles, BarChart, Settings, Zap, FileText, Image as ImageIcon } from 'lucide-react';

const icons = { Terminal, Sparkles, BarChart, Settings, Zap };

const ResultsPage = ({ scores, categories, userName, wheelName, onRestart }) => {
  const results = calculateResults(scores, categories);
  const archetype = getArchetype(scores);
  const Icon = icons[archetype.icon];
  const reportRef = useRef(null);

  const handleExportImage = async () => {
    const element = document.getElementById('report-content');
    if (!element) return;
    try {
      const isDark = document.documentElement.classList.contains('dark');
      const bgColor = isDark ? '#020617' : '#f8fafc';
      
      const blob = await toBlob(element, { 
        cacheBust: true, 
        backgroundColor: bgColor,
        style: { borderRadius: '0', padding: '20px' }
      });
      
      if ('showSaveFilePicker' in window) {
        const handle = await window.showSaveFilePicker({
          suggestedName: 'report.png',
          types: [{ description: 'PNG Image', accept: { 'image/png': ['.png'] } }]
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
      } else {
        saveAs(blob, 'report.png');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Image export failed:', err);
        alert('Failed to generate image.');
      }
    }
  };

  const handleExportPDF = async () => {
    const element = document.getElementById('report-content');
    if (!element) return;
    try {
      const isDark = document.documentElement.classList.contains('dark');
      const bgColor = isDark ? '#020617' : '#f8fafc';
      
      const blob = await toBlob(element, { 
        cacheBust: true, 
        backgroundColor: bgColor,
        pixelRatio: 2
      });
      
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUrl = reader.result;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        
        if ('showSaveFilePicker' in window) {
          const pdfBlob = pdf.output('blob');
          const handle = await window.showSaveFilePicker({
            suggestedName: 'report.pdf',
            types: [{ description: 'PDF Document', accept: { 'application/pdf': ['.pdf'] } }]
          });
          const writable = await handle.createWritable();
          await writable.write(pdfBlob);
          await writable.close();
        } else {
          pdf.save('report.pdf');
        }
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('PDF export failed:', err);
        alert('Failed to generate PDF.');
      }
    }
  };

  const handleExportWord = async () => {
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Entrepreneur Profile</title></head>
      <body>
        <h1>Entrepreneurial Profile: ${userName || 'Your Name'}</h1>
        <p>${archetype.description}</p>
        <h2>Skills Breakdown</h2>
        <ul>
          ${results.all.map(s => `<li>${s.name}: ${s.value}%</li>`).join('')}
        </ul>
        <p>Developed by Newaz Nezif</p>
      </body>
      </html>
    `;
    const blob = new Blob([content], { type: 'application/vnd.ms-word' });
    
    if ('showSaveFilePicker' in window) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: 'report.doc',
          types: [{ description: 'Word Document', accept: { 'application/msword': ['.doc'] } }]
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
      } catch (err) {
        if (err.name !== 'AbortError') saveAs(blob, 'report.doc');
      }
    } else {
      saveAs(blob, 'report.doc');
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 max-w-6xl mx-auto space-y-12 bg-[var(--bg-color)]">
      <div id="report-content" className="space-y-12 p-4 rounded-3xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500/10 text-brand-400 rounded-lg text-sm font-bold uppercase tracking-wider">
              Analysis Complete
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-color)]">
              {userName && wheelName 
                ? `${userName} ${wheelName}` 
                : userName || wheelName || 'Your Profile'}
            </h1>
          </div>
          <button
            onClick={onRestart}
            className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors no-print"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retake Assessment</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <RadarChart data={results.all} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScoreCard title="Key Strengths" items={results.top3} type="strength" />
              <ScoreCard title="Growth Opportunities" items={results.bottom3} type="weakness" />
            </div>
          </div>

          <div className="space-y-8">
            <InsightPanel results={results} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 pt-12 border-t border-slate-200 dark:border-white/5 no-print">
        <button 
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-6 py-3 glass rounded-xl hover:bg-brand-500/10 transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span>PDF</span>
        </button>
        <button 
          onClick={handleExportWord}
          className="flex items-center gap-2 px-6 py-3 glass rounded-xl hover:bg-brand-500/10 transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span>Word</span>
        </button>
        <button 
          onClick={handleExportImage}
          className="flex items-center gap-2 px-6 py-3 glass rounded-xl hover:bg-brand-500/10 transition-colors"
        >
          <ImageIcon className="w-4 h-4" />
          <span>Image</span>
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
