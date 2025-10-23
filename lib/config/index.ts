import path from "path";

const basePath: string = path.join(process.cwd(), "tennis_data");
export const playerPath = path.join(basePath, "atp_players.json");
export const rankingsPath = path.join(basePath, "atp_rankings_current.json");
