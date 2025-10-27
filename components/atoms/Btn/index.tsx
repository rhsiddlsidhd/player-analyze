import { ColorKey, SizeKey, textSizes } from "@/styles/variants";
import { AtomProps } from "@/types";
import clsx from "clsx";
import React from "react";
interface BtnProps extends AtomProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  value?: string | number;
  color?: ButtonColorkey;
  disabled?: boolean;
  size?: SizeKey;
  className?: string;
}

type ButtonColorkey = Extract<ColorKey, "blue" | "gray">;

const buttonColorVariants: Record<ButtonColorkey, string> = {
  blue: "bg-linear-to-r from-blue-500 to-indigo-600  text-white",
  gray: "bg-gray-100  text-theme-gray",
};

const Btn = ({
  children,
  onClick,
  value,
  disabled,
  color = "gray",
  size = "base",
  className,
}: BtnProps) => {
  return (
    <button
      onClick={onClick}
      value={value}
      disabled={disabled}
      className={clsx(
        "cursor-pointer rounded-md px-2 py-1 font-semibold transition-all duration-200 hover:scale-[1.05]",
        color && buttonColorVariants[color],
        size && textSizes[size],
        disabled && "pointer-events-none cursor-not-allowed opacity-50",
        className && className,
      )}
    >
      {children}
    </button>
  );
};

export default Btn;
