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
import useSWR from "swr";
import { fetcher } from "@/lib/swr";
import { useMemo } from "react";

const PlayerCarousel = ({ data: playerData }: { data: Player[] }) => {
  const queryString = useMemo(
    () => playerData.map((p) => p.wikidata_id).join(","),
    [playerData]
  );

  const { data, isLoading } = useSWR(
    `/api/wikidata/image?q=${queryString}`,
    fetcher,
    {
      // 캐싱 관련 설정
      dedupingInterval: 60 * 1000, // 1분간 중복 요청 방지
      revalidateOnFocus: false, // 포커스 시 재검증 비활성화
      revalidateOnReconnect: false, // 재연결 시 재검증 비활성화
      revalidateIfStale: false, // stale 데이터여도 재검증 안함
      refreshInterval: 0, // 자동 갱신 비활성화
      errorRetryCount: 2, // 에러 시 재시도 횟수
      errorRetryInterval: 1000, // 재시도 간격 (1초)

      // 이미지 URL은 자주 변하지 않으므로
      focusThrottleInterval: 60 * 1000, // 포커스 스로틀링

      onSuccess: (data) => {
        console.log("✅ SWR Cache HIT:", queryString);
      },
      onError: (error) => {
        console.log("❌ SWR Error:", error);
      },
    }
  );

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

              <Text className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs  flex justify-center items-center font-medium">
                {item.ioc}
              </Text>
            </div>
          </div>

          <div className="flex justify-center p-2 bg-gray-50">
            <Avatar
              loading={isLoading || !data}
              source={
                data?.data[i]
                  ? `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
                      data.data[i]
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
  );
};

export default PlayerCarousel;
