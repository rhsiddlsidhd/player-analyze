import playerMap from "@/models/ATPTourPlayers";
import { ApiResponse, Player } from "@/types";
import { NextResponse } from "next/server";

export const GET = async (): Promise<
  NextResponse<ApiResponse<Record<string, Player>>>
> => {
  const transformMap = Object.fromEntries(playerMap);
  return NextResponse.json({ success: true, data: transformMap });
};
