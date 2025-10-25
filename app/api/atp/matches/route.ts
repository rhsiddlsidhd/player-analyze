import fs from "fs";
import basePath from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { HttpError, Match } from "@/types";

export const handleError = (error: unknown) => {
  if (error instanceof HttpError) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.status }
    );
  }

  return NextResponse.json(
    { success: false, message: "Internal Server Error" },
    { status: 500 }
  );
};

export const GET = async (request: NextRequest) => {
  try {
    const year = request.nextUrl.searchParams.get("y");
    if (!year) throw new HttpError(400, "Year parameter 'y' is required");
    const user = request.nextUrl.searchParams.get("u");
    const dataPath = path.join(basePath, `atp_matches_${year}.json`);
    const matchesData: Match[] = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    if (!user) {
      return NextResponse.json({ success: true, data: matchesData });
    }

    const userMatches = matchesData.filter(
      (match) => match.winner_id === user || match.loser_id === user
    );
    return NextResponse.json({ success: true, data: userMatches });
  } catch (error) {
    return handleError(error);
  }
};
