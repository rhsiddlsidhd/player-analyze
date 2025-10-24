import basePath from "@/lib/config";
import fs from "fs";
import path from "path";
export const getMatchesATPData = (year: number) => {
  try {
    const dataPath = path.join(basePath, `atp_matches_${year}.json`);
    const matchesData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    return matchesData;
  } catch (error) {
    console.error(`❌ Failed to load data for year ${year}:`, error);
    return null;
  }
};
