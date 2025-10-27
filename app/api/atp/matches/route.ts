import fs from "fs";
import basePath from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { HttpError, Match } from "@/types";

export const handleError = (error: unknown) => {
  if (error instanceof HttpError) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.status },
    );
  }

  return NextResponse.json(
    { success: false, message: "Internal Server Error" },
    { status: 500 },
  );
};

export const GET = async (request: NextRequest) => {
  try {
    const yearParam = request.nextUrl.searchParams.get("y");
    if (!yearParam) throw new HttpError(400, "Year parameter 'y' is required");

    // 1. 연도 배열로 만들기
    const years = yearParam.split(",").map((y) => y.trim());

    const user = request.nextUrl.searchParams.get("u");

    const allMatches = years.reduce((acc, yaer) => {
      const dataPath = path.join(basePath, `atp_matches_${yaer}.json`);
      const matches: Match[] = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
      const filter = user
        ? matches.filter(
            (match) => match.winner_id === user || match.loser_id === user,
          )
        : matches;

      return { ...acc, [yaer]: filter };
    }, {});

    return NextResponse.json({ success: true, data: allMatches });
  } catch (error) {
    return handleError(error);
  }
};
