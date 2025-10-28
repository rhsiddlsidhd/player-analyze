export const TOURNAMENT_LEVELS = {
  G: "Grand Slam",
  M: "Masters 1000",
  A: "ATP 500/250",
  F: "Tour Finals",
  D: "Davis Cup",
  O: "Olympics",
} as const;

export const TOURNAMENT_ROUND_SORT = [
  "F",
  "SF",
  "QF",
  "R16",
  "R32",
  "R64",
  "R128",
] as const;
