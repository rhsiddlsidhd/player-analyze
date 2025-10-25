"use client";

import { Player } from "@/types";
import { useMemo, useState } from "react";
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import useSWR from "swr";
import { fetcher } from "@/lib/swr";

export const PieChart = ({ data: pieData }: { data: Player }) => {
  const currentYear = 2024;
  const [year, setYear] = useState<number>(currentYear);

  const { data, isLoading } = useSWR(
    `/api/atp/matches?y=${year}&u=${pieData.player_id}`,
    fetcher
  );

  const chartData = useMemo(() => {
    if (!data || isLoading) return [];

    const matches = data.data;
    const totalMatches = matches.length;

    if (totalMatches === 0) return [];

    const wins = matches.filter(
      (match: any) => match.winner_id === pieData.player_id
    );

    const losses = matches.filter(
      (match: any) => match.loser_id === pieData.player_id
    );

    return [
      {
        name: "Wins",
        value: wins.length,
        percent: ((wins.length / totalMatches) * 100).toFixed(1),
        color: "#00C49F",
      },
      {
        name: "Losses",
        value: losses.length,
        percent: ((losses.length / totalMatches) * 100).toFixed(1),
        color: "#FF8042",
      },
    ];
  }, [data, isLoading, pieData]);

  const totalMatches = chartData.reduce((sum, item) => sum + item.value, 0);
  const winRate =
    chartData.find((item) => item.name === "Wins")?.percent || "0";

  const renderTooltip = (props: any) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 text-white px-2 py-1 rounded text-xs shadow-lg">
          <div className="font-medium">{data.name}</div>
          <div className="text-gray-300">
            {data.value} ({data.percent}%)
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* 컴팩트 헤더 */}
      <div className=" text-gray-500 text-center mb-4">
        <p> Performance Analytics</p>
        <p className="text-sm">{year} Win Rate</p>
      </div>

      {/* 차트와 통계를 나란히 배치 */}
      <div className="flex items-center gap-4">
        {/* 차트 영역 */}
        <div className="shrink-0">
          {isLoading ? (
            <div className="w-32 h-32 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-200 border-t-blue-600"></div>
            </div>
          ) : chartData.length > 0 ? (
            <div className="relative w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="white"
                    strokeWidth={2}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={renderTooltip} />
                </RechartsPieChart>
              </ResponsiveContainer>

              {/* 중앙 승률 표시 */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="text-xs font-bold text-gray-800">
                    {winRate}%
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-32 h-32 flex items-center justify-center text-gray-400 bg-gray-50 rounded-full">
              <span className="text-xs">No Data</span>
            </div>
          )}
        </div>

        {/* 통계 정보 */}
        <div className="flex-1 space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-green-50 p-2 rounded text-center">
              <div className="font-bold text-green-600">{winRate}%</div>
              <div className="text-green-500">Win Rate</div>
            </div>
            <div className="bg-blue-50 p-2 rounded text-center">
              <div className="font-bold text-blue-600">{totalMatches}</div>
              <div className="text-blue-500">Matches</div>
            </div>
          </div>

          {/* 범례 */}
          {chartData.length > 0 && (
            <div className="space-y-1">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-600 flex-1">{item.name}</span>
                  <span className="text-gray-500 font-medium">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 컴팩트 년도 선택 */}
      <div className="mt-4 pt-3 border-t">
        <div className="flex gap-1 justify-center">
          {Array.from({ length: 5 }, (_, i) => {
            const buttonYear = currentYear - i;
            return (
              <button
                key={i}
                onClick={() => setYear(buttonYear)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  year === buttonYear
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {buttonYear}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
