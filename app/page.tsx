import PlayerBoard from "@/components/organisms/PlayerBoard";
import PlayerCarousel from "@/components/organisms/PlayerCarousel";
import TournamentSchedule from "@/components/organisms/TournamentSchedule";

import { currentTop10Players } from "@/models/ATPCurrentRankingPlayers";
import playerMap from "@/models/ATPTourPlayers";

export default async function Home() {
  const id = `104925`;
  const currentYear = 2024;
  const singlePlayer = playerMap.get(id);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div
        className="bg-blue-600 px-6 py-12 text-white"
        style={{
          background: "linear-gradient(to right, #2563eb, #7c3aed, #4f46e5)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              ATP Player Analytics
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-blue-100">
              실시간 ATP 선수 분석과 토너먼트 통계를 확인하세요
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-12 px-6 py-8">
        {/* Top 10 Players Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Top 10 ATP Players
            </h2>
            <p className="mt-2 text-gray-600">
              현재 세계 랭킹 상위 10명의 선수들
            </p>
          </div>
          <PlayerCarousel data={currentTop10Players} />
        </section>

        {/* Featured Player Dashboard */}
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">ATP Player</h2>
            <p className="mt-2 text-gray-600">선수 상세 분석 및 성과 리포트</p>
          </div>
          <PlayerBoard id={id} />
        </section>

        {/* Grand Slam Tournaments */}
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Grand Slam Tournaments
            </h2>
            <p className="mt-2 text-gray-600">
              {currentYear}년 4대 메이저 토너먼트 일정
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <TournamentSchedule
              year={currentYear}
              tournament="Australian Open"
            />
            <TournamentSchedule year={currentYear} tournament="Wimbledon" />
            <TournamentSchedule year={currentYear} tournament="Us Open" />
            <TournamentSchedule year={currentYear} tournament="Roland Garros" />
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 px-6 py-8 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-gray-400">
            © 2024 ATP Player Analytics. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
