import PlayerBoard from "@/components/organisms/PlayerBoard";
import PlayerCarousel from "@/components/organisms/PlayerCarousel";

import { currentTop10Players } from "@/models/ATPCurrentRankingPlayers";
import playerMap from "@/models/ATPTourPlayers";

export default async function Home() {
  const id = `104925`;
  const singlePlayer = playerMap.get(id);

  console.log("singlePlayer", singlePlayer);

  return (
    <div className="bg-black p-2 ">
      <h1 className="text-2xl font-bold mb-4">Top 10 ATP Players</h1>
      <PlayerCarousel data={currentTop10Players} />
      <h1 className="text-2xl font-bold mb-4">
        {singlePlayer?.name_first} {singlePlayer?.name_last} DashBoard Overview
      </h1>
      <PlayerBoard id={id} />
    </div>
  );
}
