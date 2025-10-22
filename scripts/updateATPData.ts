import path from "path";
import fs from "fs";
import csvtojson from "csvtojson";

class UpdateATPData {
  baseURL: string;
  dataDir: string;
  startYear: number;
  endYear: number;
  constructor() {
    this.baseURL =
      "https://raw.githubusercontent.com/JeffSackmann/tennis_atp/refs/heads/master";
    this.dataDir = path.join(process.cwd(), "tennis_data");
    this.startYear = 2020;
    this.endYear = 2024;
  }

  async ensureDirectoryExists() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
      console.log(`📁 Created directory: ${this.dataDir}`);
    }
  }

  async CSVToJSON(csvData: string, fileName: string) {
    try {
      // CSV 데이터를 JSON으로 변환
      const jsonArray = await csvtojson().fromString(csvData);

      // JSON 파일로 저장
      const jsonFileName = fileName.concat(".json");
      const jsonFilePath = path.join(this.dataDir, jsonFileName);

      fs.writeFileSync(
        jsonFilePath,
        JSON.stringify(jsonArray, null, 2),
        "utf8"
      );
      console.log(`✅ Converted and saved: ${jsonFilePath}`);
      console.log(`📊 Records: ${jsonArray.length}`);

      return jsonArray;
    } catch (error) {
      console.error("❌ Error converting CSV to JSON:", error);
      throw error;
    }
  }
  async getATPmatches() {
    await this.ensureDirectoryExists();
    const fileName = `atp_matches_`;
    const years = Array.from(
      { length: this.endYear - this.startYear + 1 },
      (_, i) => i + this.startYear
    );

    const results = await Promise.all(
      years.map(async (year) => {
        const res = await fetch(`${this.baseURL}/${fileName}${year}.csv`);
        if (!res.ok) {
          throw new Error(
            `Failed to fetch ATP matches for ${year}: ${res.statusText}`
          );
        }

        const csvData = await res.text();
        const fileNameWithYear = `${fileName}${year}`;

        // JSON으로 변환하여 저장
        const jsonData = await this.CSVToJSON(csvData, fileNameWithYear);

        return jsonData;
      })
    );

    return {
      success: true,
      data: results,
    };
  }
  async getATPCurrentRankings() {
    await this.ensureDirectoryExists();

    const fileName = `atp_rankings_current`;
    const url = `${this.baseURL}/${fileName}.csv`;

    try {
      console.log(`🚀 Fetching ${url}...`);
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(
          `Failed to fetch ATP current rankings: ${res.statusText}`
        );
      }

      const csvData = await res.text();

      // JSON으로 변환하여 저장
      const jsonData = await this.CSVToJSON(csvData, fileName);

      return {
        success: true,
        data: jsonData,
      };
    } catch (error) {
      console.error("❌ Error in getATPCurrentRankings:", error);
      throw error;
    }
  }
  async getATPPlayers() {
    await this.ensureDirectoryExists();
    const fileName = `atp_players`;
    const url = `${this.baseURL}/${fileName}.csv`;
    try {
      console.log(`🚀 Fetching ${url}...`);
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch ATP players: ${res.statusText}`);
      }

      const csvData = await res.text();

      // JSON으로 변환하여 저장
      const jsonData = await this.CSVToJSON(csvData, fileName);

      return {
        success: true,
        data: jsonData,
      };
    } catch (error) {
      console.error("❌ Error in getATPPlayers:", error);
      throw error;
    }
  }
  async getATPAllData() {
    console.log("🚀 Starting complete ATP data download...");

    try {
      const [rankingsResult, matchesResult, playersResult] = await Promise.all([
        this.getATPCurrentRankings().catch((err) => ({
          success: false,
          error: err.message,
        })),
        this.getATPmatches().catch((err) => ({
          success: false,
          error: err.message,
        })),
        this.getATPPlayers().catch((err) => ({
          success: false,
          error: err.message,
        })),
      ]);

      return [rankingsResult, matchesResult, playersResult];
    } catch (error) {
      console.error("❌ Critical error in getATPAllData:", error);
      throw error;
    }
  }
}

async function main() {
  try {
    console.log("🎾 Starting ATP data update...");
    const updater = new UpdateATPData();

    // 모든 ATP 데이터를 한번에 다운로드
    await updater.getATPAllData();

    console.log("✅ All ATP data update completed successfully!");
  } catch (error) {
    console.error("❌ Script failed:", error);
    process.exit(1);
  }
}

main();
