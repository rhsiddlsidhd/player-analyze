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
          className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden border border-gray-100"
        >
          <div className="p-4 bg-linear-to-r from-blue-50 to-indigo-50">
            <div className="grid grid-cols-[2fr_1fr] gap-3">
              <Text
                lineClamp={2}
                className="font-bold text-theme-black text-sm min-h-10 flex items-center "
              >
                {item.name_first} {item.name_last}
              </Text>

              <Badge textColor="blue" textSize="xs" className="bg-blue-100">
                {item.ioc}
              </Badge>
            </div>
          </div>

          <div className="flex justify-center p-2 bg-gray-50">
            <Avatar wikidata_id={item.wikidata_id ?? ""} />
          </div>

          <div className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <Text className="text-gray-500">Height</Text>
                <Text className="font-medium text-gray-900">
                  {item.height ? `${item.height}cm` : "Unknown"}
                </Text>
              </div>
              <div className="space-y-1">
                <Text className="text-gray-500">Hand</Text>
                <Text className="font-medium text-gray-900">
                  {item.hand === "R"
                    ? "Right"
                    : item.hand === "L"
                    ? "Left"
                    : item.hand}
                </Text>
              </div>
            </div>

            <Btn onClick={() => navigate.push(`/dashboard/${item.player_id}`)}>
              더보기
            </Btn>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PlayerCarousel;
