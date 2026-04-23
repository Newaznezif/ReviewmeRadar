export const ARCHETYPES = {
  TECHNICAL_BUILDER: {
    name: 'Technical Builder',
    description: 'You are the architect of the future. You excel at turning complex problems into elegant technical solutions.',
    why: 'Your high scores in Innovation and Technology suggest a builder mindset.',
    icon: 'Terminal'
  },
  VISIONARY_FOUNDER: {
    name: 'Visionary Founder',
    description: 'You see the world not as it is, but as it could be. You are a natural at inspiring others with your big-picture thinking.',
    why: 'Your strengths in Vision and Communication indicate a leader who leads through inspiration.',
    icon: 'Sparkles'
  },
  BUSINESS_STRATEGIST: {
    name: 'Business Strategist',
    description: 'You are the master of the game. You understand the levers of growth and how to navigate complex markets.',
    why: 'Strong Financial Literacy and Market Awareness make you a formidable strategist.',
    icon: 'BarChart'
  },
  EXECUTION_OPERATOR: {
    name: 'Execution Operator',
    description: 'You make things happen. You turn chaos into order and ideas into reality through sheer grit and organization.',
    why: 'High Resilience and Leadership scores show you can weather any storm and keep the team moving.',
    icon: 'Settings'
  },
  BALANCED_ENTREPRENEUR: {
    name: 'Balanced Entrepreneur',
    description: 'You are a versatile all-rounder, capable of handling every facet of a startup with competence.',
    why: 'Your scores are consistently high across all categories, showing great versatility.',
    icon: 'Zap'
  }
};

export const getArchetype = (scores) => {
  const { tech, innovation, vision, pitching, finance, market, resilience, leadership } = scores;

  if (tech >= 70 && innovation >= 70) return ARCHETYPES.TECHNICAL_BUILDER;
  if (vision >= 70 && pitching >= 70) return ARCHETYPES.VISIONARY_FOUNDER;
  if (finance >= 70 && market >= 70) return ARCHETYPES.BUSINESS_STRATEGIST;
  if (resilience >= 70 && leadership >= 70) return ARCHETYPES.EXECUTION_OPERATOR;
  
  return ARCHETYPES.BALANCED_ENTREPRENEUR;
};
