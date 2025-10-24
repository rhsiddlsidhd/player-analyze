import {
  ColorKey,
  lineClamps,
  SizeKey,
  textColors,
  textSizes,
} from "@/styles/variants";
import { AtomProps } from "@/types";
import clsx from "clsx";

interface TextProps extends AtomProps {
  className?: string;
  lineClamp?: number;
  textColor?: ColorKey;
  textSize?: SizeKey;
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
