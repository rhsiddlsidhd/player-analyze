export interface Player {
  player_id: string;
  name_first: string;
  name_last: string;
  hand: string;
  dob: string;
  ioc: string;
  height?: string;
  wikidata_id?: string;
}

export interface Ranking {
  ranking_date: string;
  rank: string;
  player: string;
  points: string;
}
