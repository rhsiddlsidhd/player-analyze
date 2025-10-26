import Text from "@/components/atoms/Text";
import Label from "@/components/template/Label";
import React from "react";

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <Label>
      <Text textSize="xs" textColor="gray">
        {label}
      </Text>
      <Text textSize="sm" textColor="black">
        {value}
      </Text>
    </Label>
  );
};

export default InfoItem;
