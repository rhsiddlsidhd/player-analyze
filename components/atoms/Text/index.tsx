import {
  ColorKey,
  lineClamps,
  SizeKey,
  textBolds,
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
  textBold?: keyof typeof textBolds;
}

const Text = ({
  children,
  lineClamp,
  className,
  textColor,
  textSize,
  textBold,
}: TextProps) => {
  return (
    <p
      className={clsx(
        className,
        lineClamp && lineClamps[lineClamp],
        textColor && textColors[textColor],
        textSize && textSizes[textSize],
        textBold && textBolds[textBold],
      )}
    >
      {children}
    </p>
  );
};

export default Text;
