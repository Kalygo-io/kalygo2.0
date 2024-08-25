import { useTranslation } from "next-i18next";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { TrophyIcon } from "@heroicons/react/24/outline";
import {
  BookOpenIcon,
  GlobeAmericasIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export function Stats() {
  const { t } = useTranslation();

  const stats = [
    {
      id: 1,
      headline: t("common:stats.stat1_headline"),
      subheadline: t("common:stats.stat1_subheadline"),
      icon: <BookOpenIcon className="h-8 w-8 text-blue-600" />,
    },
    {
      id: 2,
      headline: t("common:stats.stat2_headline"),
      subheadline: t("common:stats.stat2_subheadline"),
      icon: <GlobeAmericasIcon className="h-8 w-8 text-blue-600" />,
    },
    {
      id: 3,
      headline: t("common:stats.stat3_headline"),
      subheadline: t("common:stats.stat3_subheadline"),
      icon: <SparklesIcon className="h-8 w-8 text-blue-600 transform" />,
    },
  ];

  return (
    <div className="bg-gray-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col items-center gap-y-4"
            >
              <div>{stat.icon}</div>
              <dt className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl whitespace-pre-line">
                {stat.headline}
              </dt>
              <dd className="text-base leading-7 text-gray-600">
                {stat.subheadline}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
