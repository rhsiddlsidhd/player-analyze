import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  console.log("🚀 Received request for wikidata images");
  try {
    const q = req.nextUrl.searchParams.get("q");

    if (!q) return NextResponse.json({ image: null }, { status: 200 });

    const baseURL = "https://www.wikidata.org/wiki/Special:EntityData";
    const options = {
      headers: {
        Accept: "application/json",
      },
    };

    const res = await fetch(`${baseURL}/${q}.json`, {
      ...options,
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok)
      throw new Error(`Failed to fetch data from Wikidata: ${res.statusText}`);
    const { entities } = await res.json();
    const image = entities[q]?.claims?.P18?.[0]?.mainsnak?.datavalue?.value;

    return NextResponse.json({ image }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
