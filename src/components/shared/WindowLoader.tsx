import React from "react";
import Image from "next/image";

// import LoadingSVG from "@/images/loading.svg";

export const WindowLoader = () => {
  return (
    <Image
      src="/loading.svg"
      width={200}
      height={200}
      className="window-loading-animation"
      alt="Loading Icon"
      // style={{
      //   position: "absolute",
      //   left: 0,
      //   right: 0,
      //   top: 0,
      //   bottom: 0,
      //   margin: "auto",
      // }}
    ></Image>
  );
};
