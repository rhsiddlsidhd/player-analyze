import { bgColors, ColorKey } from "@/styles/variants";
import clsx from "clsx";
import React from "react";

const Label = ({
  children,
  color = "gray",
  textCenter,
}: {
  children: React.ReactNode;
  color?: ColorKey;
  textCenter?: boolean;
}) => {
  return (
    <div
      className={clsx(
        "space-y-1 rounded p-2",
        textCenter && "text-center",
        bgColors[color],
      )}
    >
      {children}
    </div>
  );
};

export default Label;
