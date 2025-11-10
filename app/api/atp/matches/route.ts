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
  /**
   * 1. 연도별
   * 2. 선수별
   * 3. 토너먼트별
   *
   * 연도o 선수x 토너먼트x => 해당 연도 모든 매치
   * 연도o 선수o 토너먼트x => 해당 연도 해당 선수 매치
   * 연도o 선수x 토너먼트o => 해당 연도 해당 토너먼트 매치
   * 연도o 선수o 토너먼트o => 해당 연도 해당 선수 해당 토너먼트 매치
   * 연도x => 에러
   */
  try {
    const yearParam = request.nextUrl.searchParams.get("y");
    if (!yearParam) throw new HttpError(400, "Year parameter 'y' is required");
    const tournamentParam = request.nextUrl.searchParams.get("t");

    // 1. 연도 배열로 만들기
    const years = yearParam.split(",").map((y) => y.trim());
    const user = request.nextUrl.searchParams.get("u");

    const allMatches = years.reduce((acc, year) => {
      const dataPath = path.join(basePath, `atp_matches_${year}.json`);
      const matches: Match[] = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

      const filteredMatches =
        user || !tournamentParam
          ? matches.filter(
              (match) => match.winner_id === user || match.loser_id === user,
            )
          : user && tournamentParam
            ? matches.filter(
                (match) =>
                  (match.tourney_name === tournamentParam &&
                    match.winner_id === user) ||
                  (match.tourney_name === tournamentParam &&
                    match.loser_id === user),
              )
            : !user && tournamentParam
              ? matches.filter(
                  (match) => match.tourney_name === tournamentParam,
                )
              : matches;

      return { ...acc, [year]: filteredMatches };
    }, {});

    return NextResponse.json({ success: true, data: allMatches });
  } catch (error) {
    return handleError(error);
  }
};
