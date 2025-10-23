import fs from "fs";
import { playerPath } from "@/lib/config";
import { Player } from "@/types";

const playerMap: Map<Player["player_id"], Player> = new Map();

// wikidata_id를 가지고 ImageUrl key value를 추가
const playersData: Player[] = JSON.parse(fs.readFileSync(playerPath, "utf-8"));

for (const data of playersData) {
  playerMap.set(data.player_id, data);
}

export default playerMap;
