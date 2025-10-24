"use client";
import Img from "@/components/atoms/Img";
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

  return (
    <div
      className={clsx(
        "relative aspect-square border-2  overflow-hidden rounded-full",
        size ? avatarSizes[size] : "w-24"
      )}
    >
      {isLoading || !data ? (
        <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
          로딩중
        </div>
      ) : (
        <Img
          src={
            data.image
              ? `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
                  data.image
                )}`
              : ""
          }
        />
      )}
    </div>
  );
};

export default Avatar;
