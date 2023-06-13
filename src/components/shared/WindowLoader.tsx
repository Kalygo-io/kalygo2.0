import React from "react";
import Image from "next/image";

import { useTranslation } from "next-i18next";

export const WindowLoader = () => {
  const { t } = useTranslation("image-alt-tags");

  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   fill="none"
    //   viewBox="0 0 24 24"
    //   stroke-width="1.5"
    //   stroke="currentColor"
    //   className="window-loading-animation"
    // >
    //   <path
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //     d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
    //   />
    // </svg>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className="window-loading-animation"
    >
      <g transform="translate(50 50)">
        <g transform="scale(0.7)">
          <g transform="translate(-50 -50)">
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
                dur="0.7575757575757576s"
              ></animateTransform>
              <path
                fill-opacity="0.8"
                fill="#5fdbfb"
                d="M50 50L50 0A50 50 0 0 1 100 50Z"
              ></path>
            </g>
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
                dur="1.0101010101010102s"
              ></animateTransform>
              <path
                fill-opacity="0.8"
                fill="#2563eb"
                d="M50 50L50 0A50 50 0 0 1 100 50Z"
                transform="rotate(90 50 50)"
              ></path>
            </g>
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
                dur="1.5151515151515151s"
              ></animateTransform>
              <path
                fill-opacity="0.8"
                fill="#ffffff"
                d="M50 50L50 0A50 50 0 0 1 100 50Z"
                transform="rotate(180 50 50)"
              ></path>
            </g>
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
                dur="3.0303030303030303s"
              ></animateTransform>
              <path
                fill-opacity="0.8"
                fill="#403d56"
                d="M50 50L50 0A50 50 0 0 1 100 50Z"
                transform="rotate(270 50 50)"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>

    // <Image
    //   src="/loading.svg"
    //   width={200}
    //   height={200}
    //   className="window-loading-animation"
    //   alt={t("image-alt-tags:loading.svg")}
    // ></Image>
  );
};
