import React from "react";
import Image from "next/image";

export const SectionLoader = () => {
  return (
    <Image
      src="/loading.svg"
      width={200}
      height={200}
      className="section-loading-animation"
      alt="Loading Icon"
    ></Image>
  );
};
