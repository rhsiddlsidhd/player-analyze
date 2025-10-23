import PlayerCarousel from "@/components/organisms/PlayerCarousel";
import { currentTop10Players } from "@/models/ATPCurrentRankingPlayers";
import matches2024ATPData from "@/models/ATPMatches2024";

import playerMap from "@/models/ATPTourPlayers";

export default async function Home() {
  const singlePlayer = playerMap.get("104925");

  const result = matches2024ATPData.filter(
    ({ winner_id, loser_id }) => winner_id === "104925" || loser_id === "104925"
  );

  console.log("result", result);
  return (
    <div className="bg-black">
      <h1 className="text-2xl font-bold mb-4">Top 10 ATP Players</h1>
      <PlayerCarousel data={currentTop10Players} />
      <h1 className="text-2xl font-bold mb-4">
        {singlePlayer?.name_first} {singlePlayer?.name_last} DashBoard Overview
      </h1>
      <div className="w-full border-2 border-white"></div>
    </div>
  );
}
