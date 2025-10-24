import Avatar from "@/components/molecules/Avatar";
import PlayerCarousel from "@/components/organisms/PlayerCarousel";
import { currentTop10Players } from "@/models/ATPCurrentRankingPlayers";
import { getMatchesATPData } from "@/models/ATPMatches2024";

import playerMap from "@/models/ATPTourPlayers";

export default async function Home() {
  const singlePlayer = playerMap.get("104925");

  console.log("singlePlayer", singlePlayer);

  const result = getMatchesATPData(2024).filter(
    ({ winner_id, loser_id }) => winner_id === "104925" || loser_id === "104925"
  );

  console.log("result", result.length);
  return (
    <div className="bg-black">
      <h1 className="text-2xl font-bold mb-4">Top 10 ATP Players</h1>
      <PlayerCarousel data={currentTop10Players} />
      <h1 className="text-2xl font-bold mb-4">
        {singlePlayer?.name_first} {singlePlayer?.name_last} DashBoard Overview
      </h1>
      <div className="w-full bg-theme-white">
        {singlePlayer && (
          <div className="p-4 flex justify-between text-theme-black">
            <Avatar wikidata_id={singlePlayer.wikidata_id ?? ""} size="5xl" />
            <div>
              <div>{singlePlayer.dob}</div>
              <div>{singlePlayer.ioc}</div>
              <div>{singlePlayer.height ?? "몰라.."}</div>
              <div>{singlePlayer.hand}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
