import fs from "fs";
import { Ranking } from "@/types";
import { rankingsPath } from "@/lib/config";
import playerMap from "../ATPTourPlayers";

const currentRankingPlayerData: Ranking[] = JSON.parse(
  fs.readFileSync(rankingsPath, "utf-8")
);

export const currentTop10Players = currentRankingPlayerData
  .slice(0, 10)
  .map((ranking) => playerMap.get(ranking.player))
  .filter((player) => player !== undefined);
