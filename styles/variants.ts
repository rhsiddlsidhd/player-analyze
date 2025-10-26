export type ColorKey =
  | "black"
  | "white"
  | "red"
  | "blue"
  | "green"
  | "gray"
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
  gray: "text-theme-gray",
  translucent: "text-theme-translucent",
};

export const bgColors: Record<ColorKey, string> = {
  black: "bg-theme-black",
  white: "bg-theme-white",
  red: "bg-red-50",
  blue: "bg-blue-50",
  green: "bg-green-50",
  gray: "bg-gray-100",
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

export const textBolds = {
  100: "font-thin",
  200: "font-extralight",
  300: "font-light",
  400: "font-normal",
  500: "font-medium",
  600: "font-semibold",
  700: "font-bold",
  800: "font-extrabold",
  900: "font-black",
} as const;
