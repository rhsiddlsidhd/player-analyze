"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import Btn from "@/components/atoms/Btn";
import Text from "@/components/atoms/Text";

import { Player } from "@/types";

import Avatar from "@/components/molecules/Avatar";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Badge from "@/components/atoms/Badge";
import useWikidataImage from "@/hooks/useWikidataImage";
import InfoItem from "@/components/molecules/InfoItem";
import { it } from "node:test";

const PlayerCarousel = ({ data: playerData }: { data: Player[] }) => {
  const navigate = useRouter();

  return (
    <Swiper
      modules={[FreeMode, Scrollbar]}
      spaceBetween={4}
      slidesPerView={"auto"}
      freeMode={true}
      scrollbar={{
        draggable: true,
        hide: false,
      }}
      style={{
        padding: "2rem 0",
      }}
    >
      {playerData.map((item, i) => (
        <SwiperSlide
          key={`slide-${i}`}
          style={{ width: "16rem" }}
          className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
        >
          <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-4">
            <div className="grid grid-cols-[2fr_1fr] gap-3">
              <Text
                lineClamp={2}
                className="text-theme-black flex min-h-10 items-center text-sm font-bold"
              >
                {item.name_first} {item.name_last}
              </Text>

              <Badge textColor="blue" textSize="xs" className="bg-blue-100">
                {item.ioc}
              </Badge>
            </div>
          </div>

          <div className="flex justify-center bg-gray-50 p-2">
            <Avatar wikidata_id={item.wikidata_id ?? ""} />
          </div>

          <div className="space-y-3 p-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <InfoItem
                label="Height"
                value={item.height ? `${item.height}cm` : "Unknown"}
              />
              <InfoItem
                label="Plays"
                value={
                  item.hand === "R"
                    ? "Right"
                    : item.hand === "L"
                      ? "Left"
                      : (item.hand ?? "Unknown")
                }
              />
            </div>

            <Btn
              onClick={() => navigate.push(`/dashboard/${item.player_id}`)}
              color="blue"
              size="sm"
            >
              더보기
            </Btn>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PlayerCarousel;
