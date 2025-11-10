import Text from "@/components/atoms/Text";
import PlayerBoard from "@/components/organisms/PlayerBoard";
import PlayerCarousel from "@/components/organisms/PlayerCarousel";
import TournamentSchedule from "@/components/organisms/TournamentSchedule";
import { CURRENTYEAR } from "@/constants";

import { currentTop10Players } from "@/models/ATPCurrentRankingPlayers";

export default async function Home() {
  const id = `104925`;

  return (
    <div className="w-full space-y-12">
      {/* Top 10 Players Section */}
      <section className="space-y-2">
        <div className="space-y-2">
          <Text textSize="3xl" textBold={900} textColor="black">
            ATP Players Top 10
          </Text>
          <Text textColor="gray">현재 세계 랭킹 상위 10명의 선수들</Text>
        </div>
        <PlayerCarousel data={currentTop10Players} />
      </section>

      {/* Featured Player Dashboard */}
      <section className="space-y-2">
        <div className="space-y-2">
          <Text textSize="3xl" textBold={900} textColor="black">
            ATP Player
          </Text>
          <Text textColor="gray">선수 상세 분석 및 성과 리포트</Text>
        </div>
        <PlayerBoard id={id} home />
      </section>

      {/* Grand Slam Tournaments */}
      <section className="space-y-2">
        <div className="space-y-2">
          <Text textSize="3xl" textBold={900} textColor="black">
            Grand Slam Tournaments
          </Text>
          <Text textColor="gray">{CURRENTYEAR}년 4대 메이저 토너먼트 일정</Text>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TournamentSchedule year={CURRENTYEAR} tournament="Australian Open" />
          <TournamentSchedule year={CURRENTYEAR} tournament="Wimbledon" />
          <TournamentSchedule year={CURRENTYEAR} tournament="Us Open" />
          <TournamentSchedule year={CURRENTYEAR} tournament="Roland Garros" />
        </div>
      </section>
    </div>
  );
}
