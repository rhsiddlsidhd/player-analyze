"use client";

import { ApiResponse, Match, Player } from "@/types";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/swr";
import Spinner from "@/components/atoms/Spinner";
import Text from "@/components/atoms/Text";
import { PieChart } from "@/components/atoms/Chart";
import AnalyticsItem from "@/components/molecules/AnalyicsItem";
import Btn from "@/components/atoms/Btn";
import { TOURNAMENT_LEVELS } from "@/constants";
import Board from "@/components/template/Board";

const PlayerDetailsAnalytics = ({
  levelStats,
  surfaceStats,
  type = "level",
}: {
  levelStats: Map<string, number>;
  surfaceStats?: Map<string, number>;
  type?: "level" | "surface";
}) => {
  const currentStats =
    type === "level" ? levelStats : surfaceStats || new Map();
  const totalMatches = Array.from(currentStats.values()).reduce(
    (sum, count) => sum + count,
    0,
  );

  if (totalMatches === 0) {
    return <div className="px-2 text-xs text-gray-400">No {type} data</div>;
  }

  return (
    <div className="space-y-1 px-2 py-1">
      {Array.from(currentStats.entries())
        .sort(([, a], [, b]) => b - a)
        .map(([key, count]) => {
          const percentage = ((count / totalMatches) * 100).toFixed(0);
          const displayName =
            type === "level"
              ? TOURNAMENT_LEVELS[key as keyof typeof TOURNAMENT_LEVELS] || key
              : getSurfaceName(key);

          return (
            <div
              key={key}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-1">
                <div
                  className="h-1.5 w-1.5 rounded-full bg-gray-400"
                  style={{
                    backgroundColor:
                      type === "level"
                        ? getLevelColor(key)
                        : getSurfaceColor(key),
                  }}
                />
                <span className="text-[10px] text-gray-600">{displayName}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium text-gray-700">{count}</span>
                <span className="text-[10px] text-gray-400">
                  ({percentage}%)
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

// 레벨별 색상 함수
const getLevelColor = (level: string): string => {
  const colors: Record<string, string> = {
    G: "#FFD700", // Grand Slam - 금색
    M: "#FF6B6B", // Masters - 빨강
    A: "#4ECDC4", // ATP Tour - 청록
    C: "#95E1D3", // Challenger - 연두
    F: "#F38BA8", // Futures/ITF - 분홍
    D: "#A8DADC", // Davis Cup - 하늘색
  };
  return colors[level] || "#9CA3AF";
};

// 서피스별 색상 함수
const getSurfaceColor = (surface: string): string => {
  const colors: Record<string, string> = {
    Hard: "#3B82F6", // 파랑
    Clay: "#EF4444", // 빨강
    Grass: "#10B981", // 초록
  };
  return colors[surface] || "#6B7280";
};

// 서피스명 변환 함수
const getSurfaceName = (surface: string): string => {
  const names: Record<string, string> = {
    Hard: "하드코트",
    Clay: "클레이",
    Grass: "잔디",
  };
  return names[surface] || "기타";
};

const PlayerAnalytics = ({ data: pieData }: { data: Player }) => {
  const currentYear = 2024;
  const [year, setYear] = useState<number>(currentYear);
  const [detailType, setDetailType] = useState<"level" | "surface">("level");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const { data, isLoading } = useSWR<ApiResponse<Record<number, Match[]>>>(
    `/api/atp/matches?y=${year}&u=${pieData.player_id}`,
    fetcher,
  );

  const chartData = useMemo(() => {
    if (!data || isLoading || !data.success) return [];
    const matches = data.data[year];

    const totalMatches = matches.length;

    if (totalMatches === 0) return [];

    const wins = matches.filter(
      (match: Match) => match.winner_id === pieData.player_id,
    );

    const losses = matches.filter(
      (match: Match) => match.loser_id === pieData.player_id,
    );

    const levelStatsWins = new Map<string, number>();
    const levelStatsLosses = new Map<string, number>();
    const surfaceStatsWins = new Map<string, number>();
    const surfaceStatsLosses = new Map<string, number>();

    for (const match of matches) {
      const isWin = match.winner_id === pieData.player_id;

      const level = match.tourney_level;
      if (isWin) {
        levelStatsWins.set(level, (levelStatsWins.get(level) || 0) + 1);
      } else {
        levelStatsLosses.set(level, (levelStatsLosses.get(level) || 0) + 1);
      }

      const surface = match.surface;
      if (isWin) {
        surfaceStatsWins.set(surface, (surfaceStatsWins.get(surface) || 0) + 1);
      } else {
        surfaceStatsLosses.set(
          surface,
          (surfaceStatsLosses.get(surface) || 0) + 1,
        );
      }
    }

    return [
      {
        name: "Wins",
        value: wins.length,
        percent: ((wins.length / totalMatches) * 100).toFixed(1),
        color: "#00C49F",
        levelStats: levelStatsWins,
        surfaceStats: surfaceStatsWins,
      },
      {
        name: "Losses",
        value: losses.length,
        percent: ((losses.length / totalMatches) * 100).toFixed(1),
        color: "#FF8042",
        levelStats: levelStatsLosses,
        surfaceStats: surfaceStatsLosses,
      },
    ];
  }, [data, isLoading, pieData, year]);

  const totalMatches = chartData.reduce((sum, item) => sum + item.value, 0);

  const winRate =
    chartData.find((item) => item.name === "Wins")?.percent || "0";

  return (
    <div>
      <div className="text-theme-gray mb-4 text-center">
        <Text> Performance Analytics</Text>
        <Text textSize="sm">{year} Win Rate</Text>
      </div>

      <div className="flex items-center">
        <div className="h-32 min-h-0 w-32 min-w-0 shrink-0">
          {isLoading ? (
            <Spinner />
          ) : chartData.length > 0 ? (
            <PieChart data={chartData} />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-50 text-gray-400">
              <span className="text-xs">No Data</span>
            </div>
          )}
        </div>

        <div className="min-h-28 flex-1 space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <AnalyticsItem
              label="Win Rate"
              value={`${winRate}%`}
              color="green"
            />

            <AnalyticsItem label="Matches" value={totalMatches} color="blue" />
          </div>

          <div className="flex gap-1">
            <Btn
              size="xs"
              color={detailType === "level" ? "blue" : "gray"}
              onClick={() => setDetailType("level")}
            >
              Tournament
            </Btn>
            <Btn
              size="xs"
              color={detailType === "surface" ? "blue" : "gray"}
              onClick={() => setDetailType("surface")}
            >
              Surface
            </Btn>
          </div>

          {chartData.length > 0 && (
            <div className="space-y-1">
              {chartData.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center gap-2 text-xs">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="flex-1 text-gray-600">{item.name}</span>
                    <span className="font-medium text-gray-500">
                      {item.value}
                    </span>
                    {/* 토글 버튼 */}
                    <button
                      onClick={() =>
                        setExpandedItem(
                          expandedItem === item.name ? null : item.name,
                        )
                      }
                      className="ml-1 flex h-4 w-4 items-center justify-center rounded text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600"
                    >
                      <svg
                        className={`h-3 w-3 transition-transform duration-200 ${
                          expandedItem === item.name ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  <div
                    className="grid transition-all duration-300 ease-in-out"
                    style={{
                      gridTemplateRows:
                        expandedItem === item.name ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-1">
                        <PlayerDetailsAnalytics
                          levelStats={item.levelStats}
                          surfaceStats={item.surfaceStats}
                          type={detailType}
                        />
                      </div>
                    </div>
                  </div>
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
