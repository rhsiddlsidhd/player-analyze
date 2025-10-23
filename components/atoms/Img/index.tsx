import Image from "next/image";
import React from "react";

const Img = ({ src }: { src: string }) => {
  if (!src) {
    return (
      <div className="absolute inset-0 w-full h-full bg-gray-200  flex items-center justify-center text-gray-400 text-xs">
        No Photo
      </div>
    );
  }
  return (
    <Image
      sizes="w-full"
      src={src}
      alt="이미지"
      fill
      className=" bg-white"
      loading="eager"
    />
  );
};

export default Img;
