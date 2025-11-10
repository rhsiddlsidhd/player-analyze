"use client";

import Board from "@/components/template/Board";
import { CURRENTYEAR } from "@/constants";
import { fetcher } from "@/lib/swr";
import { ApiResponse, Match } from "@/types";
import { useMemo } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useSWR from "swr";

const PlayerDetailBoard = ({ id }: { id: string }) => {
  const years = Array.from({ length: 5 }, (_, i) => CURRENTYEAR - i);

  const { data } = useSWR<ApiResponse<Record<string, Match[]>>>(
    `/api/atp/matches?y=${years.join(",")}&u=${id}`,
    fetcher,
  );

  const chartData = useMemo(() => {
    if (!data || !data.success) return [];

    const matchesByYear = data.data;

    return Object.keys(matchesByYear).map((year) => {
      const matches = matchesByYear[year];

      const totalFirstInWin = matches.reduce(
        (sum, match) =>
          sum + (match.winner_id === id ? Number(match.w_1stIn) : 0),
        0,
      );

      const totalFirstInLose = matches.reduce(
        (sum, match) =>
          sum + (match.loser_id === id ? Number(match.l_1stIn) : 0),
        0,
      );

      const firstServeWin = matches.reduce(
        (sum, match) =>
          sum + (match.winner_id === id ? Number(match.w_1stWon) : 0),
        0,
      );

      const firstServeLose = matches.reduce(
        (sum, match) =>
          sum + (match.loser_id === id ? Number(match.l_1stWon) : 0),
        0,
      );

      const secondServeWin = matches.reduce(
        (sum, match) =>
          sum + (match.winner_id === id ? Number(match.w_2ndWon) : 0),
        0,
      );

      const secondServeLose = matches.reduce(
        (sum, match) =>
          sum + (match.loser_id === id ? Number(match.l_2ndWon) : 0),
        0,
      );

      const totalWinnerSvpt = matches.reduce(
        (sum, match) =>
          sum + (match.winner_id === id ? Number(match.w_svpt) : 0),
        0,
      );

      const totalLoserSvpt = matches.reduce(
        (sum, match) =>
          sum + (match.loser_id === id ? Number(match.l_svpt) : 0),
        0,
      );

      const firstServeInWinPct = (totalFirstInWin / totalWinnerSvpt) * 100;
      const firstServeInLosePct = (totalFirstInLose / totalLoserSvpt) * 100;
      const firstServePointWinPct = (firstServeWin / totalFirstInWin) * 100;
      const firstServePointLosePct = (firstServeLose / totalFirstInLose) * 100;
      const secondServePointWinPct =
        (secondServeWin / (totalWinnerSvpt - totalFirstInWin)) * 100;
      const secondServePointLosePct =
        (secondServeLose / (totalLoserSvpt - totalFirstInLose)) * 100;

      return {
        year,
        firstServeInWinPct: Number(firstServeInWinPct.toFixed(2)),
        firstServeInLosePct: Number(firstServeInLosePct.toFixed(2)),
        firstServePointWinPct: Number(firstServePointWinPct.toFixed(2)),
        firstServePointLosePct: Number(firstServePointLosePct.toFixed(2)),
        secondServePointWinPct: Number(secondServePointWinPct.toFixed(2)),
        secondServePointLosePct: Number(secondServePointLosePct.toFixed(2)),
      };
    });
  }, [data, id]);

  return (
    <div className="relative grid grid-cols-2 gap-4 text-xs max-sm:grid-cols-1">
      <Board>
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-800">
              서브 성공률
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <ComposedChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="year"
                  fontSize={11}
                  tick={{ fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(value) => `${value}%`}
                  domain={[40, 80]}
                  fontSize={10}
                  tick={{ fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                  width={30}
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    fontSize: "11px",
                  }}
                />
                <Bar
                  dataKey="firstServeInWinPct"
                  fill="#22c55e"
                  name="승리 시"
                  barSize={20}
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="firstServeInLosePct"
                  fill="#ef4444"
                  name="패배 시"
                  barSize={20}
                  radius={[2, 2, 0, 0]}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-800">
              서브 득점률
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <ComposedChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="year"
                  fontSize={11}
                  tick={{ fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(value) => `${value}%`}
                  domain={[30, 90]}
                  fontSize={10}
                  tick={{ fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                  width={30}
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    fontSize: "11px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="firstServePointWinPct"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="승리시 1서브"
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="firstServePointLosePct"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  name="패배시 1서브"
                  dot={{ r: 3 }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Board>
      <div>123</div>
    </div>
  );
};

export default PlayerDetailBoard;
