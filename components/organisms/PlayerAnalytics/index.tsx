"use client";

import { Player } from "@/types";
import { useMemo, useState } from "react";

import useSWR from "swr";
import { fetcher } from "@/lib/swr";
import Spinner from "@/components/atoms/Spinner";
import Text from "@/components/atoms/Text";
import { PieChart } from "@/components/Chart";
import AnalyticsItem from "@/components/molecules/AnalyicsItem";
import Btn from "@/components/atoms/Btn";

const PlayerAnalytics = ({ data: pieData }: { data: Player }) => {
  const currentYear = 2024;
  const [year, setYear] = useState<number>(currentYear);

  const { data, isLoading } = useSWR(
    `/api/atp/matches?y=${year}&u=${pieData.player_id}`,
    fetcher,
  );

  const chartData = useMemo(() => {
    if (!data || isLoading) return [];

    const matches = data.data;
    const totalMatches = matches.length;

    if (totalMatches === 0) return [];

    const wins = matches.filter(
      (match: any) => match.winner_id === pieData.player_id,
    );

    const losses = matches.filter(
      (match: any) => match.loser_id === pieData.player_id,
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

  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <div className="text-theme-gray mb-4 text-center">
        <Text> Performance Analytics</Text>
        <Text textSize="sm">{year} Win Rate</Text>
      </div>

      <div className="flex items-center gap-4">
        {/* 차트 영역 */}
        <div className="shrink-0">
          {isLoading ? (
            <Spinner />
          ) : chartData.length > 0 ? (
            <PieChart data={chartData} />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-50 text-gray-400">
              <span className="text-xs">No Data</span>
            </div>
          )}
        </div>

        {/* 통계 정보 */}
        <div className="flex-1 space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <AnalyticsItem
              label="Win Rate"
              value={`${winRate}%`}
              color="green"
            />

            <AnalyticsItem label="Matches" value={totalMatches} color="blue" />
          </div>

          {/* 범례 */}
          {chartData.length > 0 && (
            <div className="space-y-1">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="flex-1 text-gray-600">{item.name}</span>
                  <span className="font-medium text-gray-500">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 컴팩트 년도 선택 */}
      <div className="mt-4 border-t pt-3">
        <div className="m-auto w-fit space-x-2">
          {Array.from({ length: 5 }, (_, i) => {
            const buttonYear = currentYear - i;
            return (
              <Btn
                key={i}
                onClick={() => setYear(buttonYear)}
                color={year === buttonYear ? "blue" : "gray"}
                size="xs"
              >
                {buttonYear}
              </Btn>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlayerAnalytics;
