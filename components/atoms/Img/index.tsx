import Image from "next/image";
import React from "react";

const Img = ({ src }: { src: string }) => {
  return <Image src={src} alt="이미지" fill className=" bg-white" />;
};

export default Img;
