"use client";
import { fetcher } from "@/lib/swr";
import { ApiResponse, Match } from "@/types";
import React, { useMemo } from "react";
import { Bar, ComposedChart, ResponsiveContainer } from "recharts";
import useSWR from "swr";

const PlayerDetailBoard = ({ id }: { id: string }) => {
  const currentYear = 2024;
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  const { data } = useSWR<ApiResponse<Record<number, Match[]>>>(
    `/api/atp/matches?y=${years.join(",")}&u=${id}`,
    fetcher,
  );
  console.log("data", data);

  const chartData = useMemo(() => {
    if (!data || !data.success) return [];

    const matchesByYear = data.data;
    console.log("matchesByYear", matchesByYear);
  }, [data]);

  return (
    <ResponsiveContainer width="100%" aspect={1.618}>
      <ComposedChart>
        <Bar />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default PlayerDetailBoard;
