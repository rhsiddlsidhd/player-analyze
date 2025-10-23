import PlayerCarousel from "@/components/organisms/PlayerCarousel";
import { rankingsPath } from "@/lib/config";
import playerMap from "@/models/ATPTourPlayers";
import { Ranking } from "@/types";
import fs from "fs";

export default async function Home() {
  const rankingsData: Ranking[] = JSON.parse(
    fs.readFileSync(rankingsPath, "utf-8")
  );

  const top10Players = rankingsData
    .slice(0, 10)
    .map((ranking) => playerMap.get(ranking.player))
    .filter((player) => player !== undefined);

  return (
    <div className="bg-black">
      <h1 className="text-2xl font-bold mb-4">Top 10 ATP Players</h1>
      <PlayerCarousel data={top10Players} />
    </div>
  );
}
