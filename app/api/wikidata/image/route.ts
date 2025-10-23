import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    console.log("🚀 Received request for wikidata images");
    const q = req.nextUrl.searchParams.get("q");

    if (!q) return NextResponse.json({ data: null }, { status: 200 });

    const ids = q.split(",");
    console.log("ids", ids);
    const baseURL = "https://www.wikidata.org/wiki/Special:EntityData";
    const options = {
      headers: {
        Accept: "application/json",
      },
    };

    const results = await Promise.all(
      ids.map(async (id) => {
        if (!id) return null;
        try {
          const url = `${baseURL}/${id}.json`;
          const res = await fetch(url, options);
          const { entities } = await res.json();
          const image =
            entities[id]?.claims?.P18?.[0]?.mainsnak?.datavalue?.value;
          return image;
        } catch {
          return null;
        }
      })
    );

    console.log("results", results);
    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
