"use client";
import { fetcher } from "@/lib/swr";
import { ApiResponse, Match, Player } from "@/types";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import PlayerCard from "@/components/molecules/PlayerCard";
import Board from "@/components/template/Board";

const MatchComparison = ({ num }: { num: string }) => {
  const searchParams = useSearchParams();
  const t = searchParams.get("t");
  const year = searchParams.get("y");
  const { data, isLoading } = useSWR<ApiResponse<Record<number, Match[]>>>(
    `/api/atp/matches?t=${t}&y=${year}`,
    fetcher,
  );

  const matchData = useMemo(() => {
    if (!data || !data.success) return null;
    const matches = data.data;
    const result = matches[Number(year)]?.filter(
      (match) => match.match_num === num,
    );
    return result?.[0] || null;
  }, [data, year, num]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600"></div>
      </div>
    );
  }

  if (!matchData) {
    return (
      <div className="py-8 text-center text-gray-500">
        매치 데이터를 찾을 수 없습니다.
      </div>
    );
  }

  const winner = {
    id: matchData.winner_id,
    name: matchData.winner_name,
    hand: matchData.winner_hand,
    age: matchData.winner_age,
    ioc: matchData.winner_ioc,
    ht: matchData.winner_ht,
    seed: matchData.winner_seed,
    rank: matchData.winner_rank,
    rank_points: matchData.winner_rank_points,
    ace: matchData.w_ace,
    df: matchData.w_df,
    svpt: matchData.w_svpt,
    firstIn: matchData.w_1stIn,
    firstWon: matchData.w_1stWon,
    secondWon: matchData.w_2ndWon,
  };

  const loser = {
    id: matchData.loser_id,
    name: matchData.loser_name,
    hand: matchData.loser_hand,
    age: matchData.loser_age,
    ioc: matchData.loser_ioc,
    ht: matchData.loser_ht,
    seed: matchData.loser_seed,
    rank: matchData.loser_rank,
    rank_points: matchData.loser_rank_points,
    ace: matchData.l_ace,
    df: matchData.l_df,
    svpt: matchData.l_svpt,
    firstIn: matchData.l_1stIn,
    firstWon: matchData.l_1stWon,
    secondWon: matchData.l_2ndWon,
  };

  return (
    <div className="space-y-4">
      {/* 컴팩트 매치 헤더 */}
      <Board>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="truncate text-lg font-bold text-gray-800">
            {matchData.tourney_name}
          </h3>
          <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
            {matchData.round}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex gap-3">
            <span>{matchData.tourney_date}</span>
            <span>{matchData.surface}</span>
          </div>
          <span className="font-medium text-gray-700">{matchData.score}</span>
        </div>
      </Board>

      {/* 모바일: Swiper */}
      <div className="block sm:hidden">
        <Swiper
          modules={[Pagination]}
          spaceBetween={12}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="pb-8"
        >
          <SwiperSlide>
            <PlayerCard type="winner" player={winner} />
          </SwiperSlide>
          <SwiperSlide>
            <PlayerCard type="loser" player={loser} />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* 데스크톱: 가로 배치 */}
      <div className="hidden gap-4 sm:grid sm:grid-cols-2">
        <PlayerCard type="winner" player={winner} />
        <PlayerCard type="loser" player={loser} />
      </div>
    </div>
  );
};

export default MatchComparison;
