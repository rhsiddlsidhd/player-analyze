"use client";
import Btn from "@/components/atoms/Btn";
import Spinner from "@/components/atoms/Spinner";
import Text from "@/components/atoms/Text";
import LinkBtn from "@/components/molecules/LinkBtn";
import Board from "@/components/template/Board";
import { TOURNAMENT_ROUND_SORT } from "@/constants";
import { fetcher } from "@/lib/swr";
import { ApiResponse, Match } from "@/types";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import useSWR from "swr";

const TournamentSchedule = ({
  year,
  tournament,
}: {
  year: number;
  tournament: string;
}) => {
  const { data, isLoading } = useSWR<ApiResponse<Record<number, Match[]>>>(
    `/api/atp/matches?y=${year}&t=${tournament}`,
    fetcher,
  );

  const sortedMatches = useMemo(() => {
    if (!data || !data.success) return;
    const { data: tournamentData } = data;
    return tournamentData[year].sort(
      (a, b) =>
        TOURNAMENT_ROUND_SORT.indexOf(a.round) -
        TOURNAMENT_ROUND_SORT.indexOf(b.round),
    );
  }, [data, year]);

  return (
    <Board>
      <div className="flex items-center justify-between">
        <Text textColor="gray" lineClamp={1}>
          {tournament} for {year}
        </Text>
        <LinkBtn label="더보기" path="#" size="xs" />
      </div>
      <ul className="text-theme-black relative mt-4 h-64 overflow-scroll overflow-x-hidden border-2 border-red-500">
        {isLoading ? (
          <li className="flex h-full items-center justify-center">
            <Spinner />
          </li>
        ) : !sortedMatches ? (
          <li className="text-theme-gray flex h-full items-center justify-center">
            No matches found
          </li>
        ) : (
          sortedMatches.map((match, i) => (
            <li key={i} className="border-b border-gray-200 py-2">
              <Link
                href={`/match/${match.match_num}?t=${tournament}&y=${year}`}
              >
                {/* match_num 을 전달 */}
                <Text textSize="sm" lineClamp={1}>
                  {match.winner_name} vs {match.loser_name} - {match.round}
                </Text>
              </Link>
            </li>
          ))
        )}
      </ul>
    </Board>
  );
};

export default TournamentSchedule;
