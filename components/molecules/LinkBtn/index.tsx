import Btn from "@/components/atoms/Btn";
import { SizeKey } from "@/styles/variants";
import Link from "next/link";

interface LinkButtonProps {
  path: string;
  label: string;
  size?: SizeKey;
}

const LinkBtn = ({ path, label, size }: LinkButtonProps) => {
  return (
    <Link href={path}>
      <Btn color="blue" size={size}>
        {label}
      </Btn>
    </Link>
  );
};

export default LinkBtn;
