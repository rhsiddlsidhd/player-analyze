"use client";
import Img from "@/components/atoms/Img";
import Spinner from "@/components/atoms/Spinner";
import useWikidataImage from "@/hooks/useWikidataImage";
import { SizeKey } from "@/styles/variants";
import clsx from "clsx";

const avatarSizes: Record<SizeKey, string> = {
  xs: "w-8 max-sm:w-4",
  sm: "w-12 max-sm:w-8",
  base: "w-16 max-sm:w-12",
  lg: "w-20 max-sm:w-16",
  xl: "w-24 max-sm:w-20",
  "2xl": "w-32 max-sm:w-26",
  "3xl": "w-40 max-sm:w-34",
  "4xl": "w-48 max-sm:w-42",
  "5xl": "w-56 max-sm:w-50",
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
