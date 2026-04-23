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
    name: currentCategories.find(c => c.id === id)?.name || id,
    color: currentCategories.find(c => c.id === id)?.color || '#6366f1',
    value: Number(value)
  }));

  const sorted = [...scoreArray].sort((a, b) => b.value - a.value);
  const average = Math.round(scoreArray.reduce((acc, curr) => acc + curr.value, 0) / scoreArray.length);
  
  // Expert Benchmark (Gold Standard)
  const expertData = scoreArray.map(item => ({ ...item, value: 85 }));

  // AI Shape Analysis
  let shapeAnalysis = "Your profile is well-balanced across most domains.";
  const topCategories = sorted.slice(0, 2).map(c => c.id);
  
  if (topCategories.includes('vision') && topCategories.includes('tech')) {
    shapeAnalysis = "You have a 'Visionary Architect' shape. You can see the future and build the tools to get there, but don't forget to focus on the human side of leadership.";
  } else if (topCategories.includes('finance') && topCategories.includes('market')) {
    shapeAnalysis = "Your shape is 'Market Realistic'. You have a very strong grasp of the numbers and the customers, which makes you a low-risk, high-stability leader.";
  } else if (topCategories.includes('resilience') && topCategories.includes('leadership')) {
    shapeAnalysis = "You possess a 'Core-Strong' shape. You are an unshakable leader who can weather any storm, though you may benefit from more aggressive market growth.";
  }

  // Psychographic Persona
  const personaMap = {
    'vision': 'The Visionary',
    'tech': 'The Engineer',
    'finance': 'The Strategist',
    'leadership': 'The Commander',
    'market': 'The Explorer',
    'pitching': 'The Storyteller',
    'resilience': 'The Titan',
    'innovation': 'The Inventor'
  };
  const persona = personaMap[sorted[0].id] || 'The Specialist';

  // Power Duo Logic
  const top2 = sorted.slice(0, 2);
  const synergyTitle = `${top2[0].name.split(' ')[0]} ${top2[1].name.split(' ')[0]} Master`;

  // Roadmap Logic
  const weakest = sorted.slice(-2);
  const roadmap = [
    { 
      title: `Stabilize ${weakest[0].name}`, 
      action: `Dedicate 2 hours this week to auditing your current ${weakest[0].name.toLowerCase()} processes.`,
      status: 'High Priority'
    },
    { 
      title: `Upskill in ${weakest[1].name}`, 
      action: `Identify a mentor or course specifically targeting ${weakest[1].name.toLowerCase()} optimization.`,
      status: 'Growth Phase'
    },
    { 
      title: 'Expert Alignment', 
      action: `Your gap to the 'Expert Benchmark' in ${weakest[0].name} is ${85 - weakest[0].value} points. Focus here to reach elite status.`,
      status: 'Elite Path'
    }
  ];

  return {
    average,
    persona,
    shapeAnalysis,
    expertData,
    synergy: {
      title: synergyTitle,
      pair: top2
    },
    roadmap,
    top3: sorted.slice(0, 3),
    bottom3: sorted.slice(-3).reverse(),
    all: scoreArray
  };
};
