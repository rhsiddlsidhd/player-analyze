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
    <div className="space-y-4 bg-black p-2">
      <h1 className="text-2xl font-bold">Top 10 ATP Players</h1>
      <PlayerCarousel data={currentTop10Players} />
      <h1 className="text-2xl font-bold">
        {singlePlayer?.name_first} {singlePlayer?.name_last} DashBoard Overview
      </h1>
      <PlayerBoard id={id} />
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <TournamentSchedule year={currentYear} tournament="Australian Open" />
        <TournamentSchedule year={currentYear} tournament="Wimbledon" />
        <TournamentSchedule year={currentYear} tournament="Us Open" />
        <TournamentSchedule year={currentYear} tournament="Roland Garros" />
      </div>
    </div>
  );
}
