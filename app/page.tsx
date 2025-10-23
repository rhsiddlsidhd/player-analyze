import PlayerCarousel from "@/components/organisms/PlayerCarousel";
import { currentTop10Players } from "@/models/ATPCurrentRankingPlayers";

export default async function Home() {
  return (
    <div className="bg-black">
      <h1 className="text-2xl font-bold mb-4">Top 10 ATP Players</h1>
      <PlayerCarousel data={currentTop10Players} />
    </div>
  );
}
