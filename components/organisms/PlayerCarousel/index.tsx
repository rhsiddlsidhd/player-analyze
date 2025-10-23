"use client";
import { fetchWikidataImage } from "@/api/wikidata/fetchWikidataImage";
import Avatar from "@/components/molecules/Avatar";
import { Player } from "@/types";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import Btn from "@/components/atoms/Btn";
import Text from "@/components/atoms/Text";

const PlayerCarousel = ({ data }: { data: Player[] }) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      for (const player of data) {
        const image = player.wikidata_id
          ? await fetchWikidataImage(player.wikidata_id)
          : null;
        setImages((prevImages) => [...prevImages, image]);
      }
    };
    fetchImages();
  }, [data]);

  return (
    <div className="w-full">
      <Swiper
        modules={[FreeMode, Scrollbar]}
        spaceBetween={20}
        slidesPerView={"auto"}
        freeMode={true}
        scrollbar={{
          draggable: true,
          hide: false,
        }}
        style={{
          padding: "1.5rem 0 2rem 0",
        }}
      >
        {data.map((item, i) => (
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

                <Text className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs  flex justify-center items-center font-medium">
                  {item.ioc}
                </Text>
              </div>
            </div>

            <div className="flex justify-center p-2 bg-gray-50">
              <Avatar
                source={
                  images[i]
                    ? `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
                        images[i]
                      )}`
                    : ""
                }
              />
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

              <Btn>더보기</Btn>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PlayerCarousel;
