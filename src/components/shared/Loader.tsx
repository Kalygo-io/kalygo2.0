import React from "react";
import Image from "next/image";

// import LoadingSVG from "@/images/loading.svg";

export const Loader = () => {
  return (
    <Image
      src="/loading.svg"
      width={200}
      height={200}
      className="loading-animation"
      style={{
        position: "relative",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: "auto",
      }}
      alt="Loading Icon"
    ></Image>
  );
};
