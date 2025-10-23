export const fetchWikidataImage = async (wikidata_id: string) => {
  const url = `https://www.wikidata.org/wiki/Special:EntityData/${wikidata_id}.json`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch wikidata image");
  }
  const { entities } = await res.json();
  const value =
    entities[wikidata_id]?.claims?.P18?.[0]?.mainsnak?.datavalue?.value;
  return value;
};
