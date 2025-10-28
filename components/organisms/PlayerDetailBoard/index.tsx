"use client";

import { fetcher } from "@/lib/swr";
import { ApiResponse, Match } from "@/types";
import { useMemo } from "react";
import { Bar, ComposedChart, ResponsiveContainer } from "recharts";
import useSWR from "swr";

interface SurfaceStat {
  firstInRate: number;
  firstWonRate: number;
  secondWonRate: number;
}
interface SurfaceStats {
  [key: number]: Partial<Record<string, SurfaceStat>>;
}

const PlayerDetailBoard = ({ id }: { id: string }) => {
  const currentYear = 2024;
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const { data } = useSWR<ApiResponse<Record<number, Match[]>>>(
    `/api/atp/matches?y=${years.join(",")}&u=${id}`,
    fetcher,
  );

  const chartData = useMemo(() => {
    if (!data || !data.success) return [];

    /**
     * G:{ serin1st:... , serin2nd:... , winrate:...}
     * A:{ serin1st:... , serin2nd:... , winrate:...}
     */

    // 첫 서브 성공률 = (1stIn / Svpt) * 100
    // 첫 서브 득점률 = (1stWon / 1stIn) * 100
    // 두번째 서브 득점률 = (2ndWon / (Svpt - 1stIn)) * 100

    const matchesByYear = data.data;
    const yearkeys = Object.keys(matchesByYear).map((y) => parseInt(y, 10));
  }, [data]);

  return (
    <div className="grid grid-cols-2 max-sm:grid-cols-1">
      <ResponsiveContainer width="100%" aspect={1.618}>
        <ComposedChart>
          <Bar />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlayerDetailBoard;
