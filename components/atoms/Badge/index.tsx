import {
  ColorKey,
  textColors,
  TextSizeKey,
  textSizes,
} from "@/styles/variants";
import { AtomProps } from "@/types";
import clsx from "clsx";

interface BadgeProps extends AtomProps {
  className?: string;
  textColor?: ColorKey;
  textSize?: TextSizeKey;
  bgColor?: ColorKey;
}

const Badge = ({
  children,
  className,
  textColor,
  textSize,
  bgColor,
}: BadgeProps) => {
  return (
    <aside
      className={clsx(
        "rounded-full flex justify-center items-center px-2 py-1 ",
        className,
        textColor && textColors[textColor],
        textSize && textSizes[textSize],
        bgColor && textColors[bgColor]
      )}
    >
      {children}
    </aside>
  );
};

export default Badge;
