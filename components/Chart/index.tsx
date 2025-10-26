"use client";

import React, { useState } from "react";
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export const PieChart = ({
  data,
}: {
  data: { name: string; value: number; percent: string; color: string }[];
}) => {
  const [onHover, setOnHover] = useState<boolean>(false);

  const renderTooltip = (props: any) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded bg-gray-900 px-2 py-1 text-xs text-white shadow-lg">
          <div className="font-medium">{data.name}</div>
          <div className="text-gray-300">
            {data.value} ({data.percent}%)
          </div>
        </div>
      );
    }
    return null;
  };

  const winRate = data.find((item) => item.name === "Wins")?.percent || "0";

  return (
    <div
      className="relative h-32 w-32"
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={20}
            outerRadius={50}
            fill="#8884d8"
            dataKey="value"
            stroke="white"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={renderTooltip} />
        </RechartsPieChart>
      </ResponsiveContainer>

      {/* 중앙 승률 표시 */}
      <div
        style={{ opacity: !onHover ? 1 : 0, transition: `opacity 0.3s ease` }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="text-xs font-bold text-gray-800">{winRate}%</div>
      </div>
    </div>
  );
};
