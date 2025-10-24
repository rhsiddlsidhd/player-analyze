export type ColorKey =
  | "black"
  | "white"
  | "red"
  | "blue"
  | "green"
  | "translucent";
export type SizeKey =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";

export const textColors: Record<ColorKey, string> = {
  black: "text-theme-black",
  white: "text-theme-white",
  red: "text-theme-red",
  blue: "text-theme-blue",
  green: "text-theme-green",
  translucent: "text-theme-translucent",
};

export const bgColors: Record<ColorKey, string> = {
  black: "bg-theme-black",
  white: "bg-theme-white",
  red: "bg-theme-red",
  blue: "bg-theme-blue",
  green: "bg-theme-green",
  translucent: "bg-theme-translucent",
};

export const lineClamps: Record<number, string> = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
};

export const textSizes: Record<SizeKey, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
};
