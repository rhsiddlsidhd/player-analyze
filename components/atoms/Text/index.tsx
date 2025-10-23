import {
  ColorKey,
  lineClamps,
  textColors,
  TextSizeKey,
  textSizes,
} from "@/styles/variants";
import clsx from "clsx";
import React from "react";

interface TextProps {
  children: React.ReactNode;
  className?: string;
  lineClamp?: number;
  textColor?: ColorKey;
  textSize?: TextSizeKey;
}

const Text = ({
  children,
  lineClamp,
  className,
  textColor,
  textSize,
}: TextProps) => {
  return (
    <p
      className={clsx(
        className,
        lineClamp && lineClamps[lineClamp],
        textColor && textColors[textColor],
        textSize && textSizes[textSize]
      )}
    >
      {children}
    </p>
  );
};

export default Text;
