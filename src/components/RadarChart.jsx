import { motion } from 'framer-motion';
import {
  Radar,
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import { useDimensions } from '../hooks/useDimensions';

const RadarChart = ({ data, expertData, average }) => {
  const [containerRef, { width, height }] = useDimensions();
  const outerRadius = Math.min(width, height) * 0.3;

  return (
    <div ref={containerRef} className="w-full h-[400px] md:h-[500px] glass rounded-3xl p-6 relative overflow-hidden flex items-center justify-center">
      {/* Power Score Gauge - Mini Version positioned top-left */}
      <div className="absolute top-6 left-6 z-30 group no-print">
        <div className="absolute inset-0 bg-brand-500/10 rounded-full blur-xl group-hover:bg-brand-500/20 transition-all duration-500" />
        <div className="relative w-24 h-24 flex flex-col items-center justify-center rounded-full border-2 border-slate-200 dark:border-white/5 bg-white/10 backdrop-blur-md shadow-lg">
          <svg className="absolute inset-0 w-full h-full -rotate-90 scale-90">
            <circle
              cx="48" cy="48" r="42"
              fill="none" stroke="currentColor" strokeWidth="6"
              className="text-slate-100 dark:text-white/5"
            />
            <motion.circle
              cx="48" cy="48" r="42"
              fill="none" stroke="#0ea5e9" strokeWidth="6"
              strokeDasharray={264}
              initial={{ strokeDashoffset: 264 }}
              animate={{ strokeDashoffset: 264 - (264 * average) / 100 }}
              transition={{ duration: 2, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>
          <span className="text-2xl font-black text-[var(--text-color)]">{average}%</span>
          <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest text-center">Power<br/>Score</span>
        </div>
      </div>

      {width > 0 && height > 0 && (
        <div className="relative" style={{ width: width - 32, height: height - 32 }}>
          
          {/* Layer 0: Expert Benchmark (Subtle Ghost Radar) */}
          {expertData && (
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
              <RechartsRadar 
                width={width - 32} 
                height={height - 32} 
                cx="50%" 
                cy="50%" 
                outerRadius={outerRadius} 
                data={expertData}
                margin={{ top: 20, right: 90, bottom: 20, left: 90 }}
              >
                <Radar
                  dataKey="value"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  fillOpacity={0.1}
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  isAnimationActive={false}
                />
              </RechartsRadar>
            </div>
          )}

          {/* Layer 1: The Multi-Color Dynamic Slices (The Data) */}
          <div className="absolute inset-0 z-10">
            <PieChart width={width - 32} height={height - 32}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={(d) => (outerRadius * d.value) / 100}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={1}
                isAnimationActive={true}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    fillOpacity={0.7}
                    className="hover:fill-opacity-100 transition-all duration-300"
                  />
                ))}
              </Pie>
            </PieChart>
          </div>

          {/* Layer 2: The Grid and Labels (Placed ON TOP so lines are visible) */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <RechartsRadar 
              width={width - 32} 
              height={height - 32} 
              cx="50%" 
              cy="50%" 
              outerRadius={outerRadius} 
              data={data}
              margin={{ top: 20, right: 90, bottom: 20, left: 90 }}
            >
              <PolarGrid stroke="rgba(255, 255, 255, 0.25)" strokeDasharray="3 3" />
              <PolarAngleAxis
                dataKey="name"
                tick={(props) => {
                  const { payload, x, y, textAnchor, index } = props;
                  const item = data[index];
                  const words = payload.value.split(' ');
                  const lines = [];
                  let currentLine = '';

                  words.forEach(word => {
                    if ((currentLine + word).length > 12) {
                      lines.push(currentLine.trim());
                      currentLine = word + ' ';
                    } else {
                      currentLine += word + ' ';
                    }
                  });
                  lines.push(currentLine.trim());

                  return (
                    <text
                      x={x}
                      y={y}
                      textAnchor={textAnchor}
                      fill={item?.color || 'var(--text-color)'}
                      fontSize={11}
                      fontWeight={700}
                    >
                      {lines.map((line, i) => (
                        <tspan key={i} x={x} dy={i === 0 ? 0 : 12}>
                          {line}
                        </tspan>
                      ))}
                    </text>
                  );
                }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              
              {/* Subtle Outline of the Shape */}
              <Radar
                dataKey="value"
                stroke="white"
                strokeOpacity={0.4}
                fill="none"
                strokeWidth={2}
                dot={(props) => {
                  const { cx, cy, index } = props;
                  const item = data[index];
                  return (
                    <circle key={`dot-${index}`} cx={cx} cy={cy} r={4} fill={item?.color} stroke="#fff" strokeWidth={2} />
                  );
                }}
              />
            </RechartsRadar>
          </div>

          {/* Layer 3: Background Full Circle (Subtle) */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <PieChart width={width - 32} height={height - 32}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={outerRadius}
                innerRadius={0}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                stroke="none"
                isAnimationActive={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`bg-cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
      )}
    </div>
  );
};

export default RadarChart;
