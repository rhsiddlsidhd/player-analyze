import { matches2024Path } from "@/lib/config";
import fs from "fs";
const matches2024ATPData = JSON.parse(
  fs.readFileSync(matches2024Path, "utf-8")
);

export default matches2024ATPData;
