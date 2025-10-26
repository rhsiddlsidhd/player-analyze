"use client";
import Img from "@/components/atoms/Img";
import Spinner from "@/components/atoms/Spinner";
import useWikidataImage from "@/hooks/useWikidataImage";
import { SizeKey } from "@/styles/variants";
import clsx from "clsx";

const avatarSizes: Record<SizeKey, string> = {
  xs: "w-8",
  sm: "w-12",
  base: "w-16",
  lg: "w-20",
  xl: "w-24",
  "2xl": "w-32",
  "3xl": "w-40",
  "4xl": "w-48",
  "5xl": "w-56",
};

const Avatar = ({
  wikidata_id,
  size,
}: {
  wikidata_id: string;
  size?: SizeKey;
}) => {
  const { data, isLoading } = useWikidataImage(wikidata_id);

  if (isLoading || !data) {
    return <Spinner />;
  }

  return (
    <div
      className={clsx(
        "relative aspect-square overflow-hidden rounded-full border-2",
        size ? avatarSizes[size] : "w-24",
      )}
    >
      <Img
        src={
          data.image
            ? `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
                data.image,
              )}`
            : ""
        }
      />
    </div>
  );
};

export default Avatar;
