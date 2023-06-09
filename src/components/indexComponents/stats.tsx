import { useTranslation } from "next-i18next";

export function Stats() {
  const { t } = useTranslation();

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t("common:stats.headline")}
          </h2>
          <p className="mt-6 text-base leading-7 text-gray-600">
            {t("common:stats.subheadline")}
          </p>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end">
          <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-white p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start border shadow">
            <p className="flex-none text-3xl font-bold tracking-tight text-blue-700">
              580+
            </p>
            <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p className="text-lg font-semibold tracking-tight text-black">
                {t("common:stats.stat1_headline")}
              </p>
              <p className="mt-2 text-base leading-7 text-black">
                {t("common:stats.stat1_subheadline")}
              </p>
            </div>
          </div>
          <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-white p-8 sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-sm lg:flex-auto lg:flex-col lg:items-start lg:gap-y-44 border shadow">
            <p className="flex-none text-3xl font-bold tracking-tight text-blue-700">
              100%
            </p>
            <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p className="text-lg font-semibold tracking-tight text-black">
                {t("common:stats.stat2_headline")}
              </p>
              <p className="mt-2 text-base leading-7 text-black">
                {t("common:stats.stat2_subheadline")}
              </p>
            </div>
          </div>
          <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-white p-8 sm:w-11/12 sm:max-w-xl sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-none lg:flex-auto lg:flex-col lg:items-start lg:gap-y-28  border shadow">
            <p className="flex-none text-3xl font-bold tracking-tight text-blue-700">
              $1Bn+
            </p>
            <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p className="text-lg font-semibold tracking-tight text-black">
                {t("common:stats.stat3_headline")}
              </p>
              <p className="mt-2 text-base leading-7 text-black">
                {t("common:stats.stat3_subheadline")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
