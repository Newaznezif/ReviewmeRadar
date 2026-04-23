import React from 'react';
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

const RadarChart = ({ data }) => {
  const [containerRef, { width, height }] = useDimensions();
  const pieData = data.map(item => ({ value: 1, color: item.color }));

  // Standard radius calculation to fit the container
  const outerRadius = Math.min(width, height) * 0.3;

  return (
    <div ref={containerRef} className="w-full h-[400px] md:h-[500px] glass rounded-3xl p-4 relative overflow-hidden">
      {width > 0 && height > 0 && (
        <>
          {/* Background Layer */}
          <div className="absolute inset-4 -z-10">
            <PieChart width={width - 32} height={height - 32}>
              <Pie
                data={pieData}
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
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.1} />
                ))}
              </Pie>
            </PieChart>
          </div>

          {/* Main Chart Layer */}
          <RechartsRadar 
            width={width - 32} 
            height={height - 32} 
            cx="50%" 
            cy="50%" 
            outerRadius={outerRadius} 
            data={data}
            margin={{ top: 20, right: 60, bottom: 20, left: 60 }}
          >
            <PolarGrid stroke="rgba(148, 163, 184, 0.2)" />
            <PolarAngleAxis
              dataKey="name"
              tick={(props) => {
                const { payload, x, y, textAnchor, index } = props;
                const item = data[index];
                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor={textAnchor}
                    fill={item?.color || 'var(--text-color)'}
                    fontSize={10}
                    fontWeight={600}
                  >
                    {payload.value}
                  </text>
                );
              }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Skills"
              dataKey="value"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.5}
              strokeWidth={4}
              dot={(props) => {
                const { cx, cy, index } = props;
                const item = data[index];
                return (
                  <circle key={`dot-${index}`} cx={cx} cy={cy} r={4} fill={item?.color} stroke="#fff" strokeWidth={2} />
                );
              }}
              isAnimationActive={true}
              animationDuration={1500}
            />
          </RechartsRadar>
        </>
      )}
    </div>
  );
};

export default RadarChart;
