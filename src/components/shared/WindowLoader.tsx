import React from "react";
import Image from "next/image";

import { useTranslation } from "next-i18next";

export const WindowLoader = () => {
  const { t } = useTranslation("image-alt-tags");

  return (
    <Image
      src="/loading.svg"
      width={200}
      height={200}
      className="window-loading-animation"
      alt={t("image-alt-tags:loading.svg")}
    ></Image>
  );
};
