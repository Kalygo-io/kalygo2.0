import {
  BeakerIcon,
  DocumentMagnifyingGlassIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

interface P {
  account: {
    summaryCredits: number;
    vectorSearchCredits: number;
    customRequestCredits: number;
  };
}

export function Credits(p: P) {
  const {
    account: { summaryCredits, vectorSearchCredits, customRequestCredits },
  } = p;
  const { t } = useTranslation();

  const router = useRouter();

  const stats = [
    {
      id: 1,
      name: t("dashboard-page:index.credits.summarization-credits"),
      stat: summaryCredits,
      icon: LifebuoyIcon,
      onClick: () => {
        router.push("/dashboard/summarize/summarize-v2");
      },
      onClickText: t("dashboard-page:index.credits.try-summarization-credits"),
    },
    {
      id: 2,
      name: t("dashboard-page:index.credits.custom-request-credits"),
      stat: customRequestCredits,
      icon: BeakerIcon,
      onClick: () => {
        router.push("/dashboard/custom-request/custom-request-v2");
      },
      onClickText: t("dashboard-page:index.credits.try-custom-request-credits"),
    },
    {
      id: 3,
      name: t("dashboard-page:index.credits.vector-search-credits"),
      stat: customRequestCredits,
      icon: DocumentMagnifyingGlassIcon,
      onClick: () => {
        router.push("/dashboard/vector-search");
      },
      onClickText: t("dashboard-page:index.credits.try-vector-search-credits"),
    },
    // {
    //   id: 3,
    //   name: t("dashboard-page:index.credits.credit-card-charges"),
    //   stat: "$0.00",
    //   icon: CreditCardIcon,
    //   onClick: () => {
    //     router.push("/dashboard/settings");
    //   },
    //   onClickText: t("dashboard-page:index.credits.more-info"),
    // },
  ];

  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.stat}
              </p>
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <button
                    onClick={item.onClick}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    {item.onClickText}
                  </button>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
