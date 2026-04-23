export const CATEGORIES = [
  { id: 'vision', name: 'Business Vision & Strategy', color: '#60a5fa' },
  { id: 'finance', name: 'Financial Literacy & Management', color: '#4ade80' },
  { id: 'market', name: 'Market Awareness & Customer Understanding', color: '#facc15' },
  { id: 'pitching', name: 'Communication & Pitching', color: '#f87171' },
  { id: 'leadership', name: 'Leadership & Team Building', color: '#c084fc' },
  { id: 'innovation', name: 'Innovation & Problem-Solving', color: '#fb923c' },
  { id: 'networking', name: 'Networking & Community', color: '#2dd4bf' },
  { id: 'resilience', name: 'Personal Resilience & Growth Mindset', color: '#e879f9' },
  { id: 'tech', name: 'Digital & Technology Skills', color: '#818cf8' },
  { id: 'impact', name: 'Social Impact & Sustainability', color: '#a3e635' },
];

export const calculateResults = (scores, categories) => {
  const currentCategories = categories || CATEGORIES;
  const scoreArray = Object.entries(scores).map(([id, value]) => ({
    id,
    name: currentCategories.find(c => c.id === id).name,
    color: currentCategories.find(c => c.id === id).color,
    value: Number(value)
  }));

  const sorted = [...scoreArray].sort((a, b) => b.value - a.value);
  
  return {
    average: Math.round(scoreArray.reduce((acc, curr) => acc + curr.value, 0) / scoreArray.length),
    top3: sorted.slice(0, 3),
    bottom3: sorted.slice(-3).reverse(),
    all: scoreArray
  };
};
