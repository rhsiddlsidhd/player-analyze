import Text from "@/components/atoms/Text";
import Label from "@/components/template/Label";
import { ColorKey, textColors } from "@/styles/variants";
import clsx from "clsx";
import React from "react";

const AnalyticsItem = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color?: ColorKey;
}) => {
  return (
    <Label textCenter color={color}>
      <Text className={clsx("font-bold", color && textColors[color])}>
        {value}
      </Text>
      <Text className={clsx("font-thin", color && textColors[color])}>
        {label}
      </Text>
    </Label>
  );
};

export default AnalyticsItem;
