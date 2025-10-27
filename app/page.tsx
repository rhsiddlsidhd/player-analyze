import PlayerBoard from "@/components/organisms/PlayerBoard";
import PlayerCarousel from "@/components/organisms/PlayerCarousel";

import { currentTop10Players } from "@/models/ATPCurrentRankingPlayers";
import playerMap from "@/models/ATPTourPlayers";

export default async function Home() {
  const id = `104925`;
  const singlePlayer = playerMap.get(id);

  return (
    <div className="space-y-4 bg-black p-2">
      <h1 className="text-2xl font-bold">Top 10 ATP Players</h1>
      <PlayerCarousel data={currentTop10Players} />
      <h1 className="text-2xl font-bold">
        {singlePlayer?.name_first} {singlePlayer?.name_last} DashBoard Overview
      </h1>
      <PlayerBoard id={id} />
      <h1 className="text-2xl font-bold">
        년도 별 Australian Open 결승 & 준결승 & 8강 순위
      </h1>
    </div>
  );
}
