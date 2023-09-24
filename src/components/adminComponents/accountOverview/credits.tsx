import { useTranslation } from "next-i18next";

interface P {
  account: {
    summaryCredits: number;
    vectorSearchCredits: number;
    customRequestCredits: number;
    usageCredits: number;
  };
}

export function Credits(p: P) {
  const {
    account: {
      summaryCredits,
      vectorSearchCredits,
      customRequestCredits,
      usageCredits,
    },
  } = p;
  const { t } = useTranslation();

  console.log("p.account", p.account);

  const stats: any[] = [
    {
      id: 1,
      name:
        summaryCredits === 1
          ? t("dashboard-page:admin.account.credits.summary")
          : t("dashboard-page:admin.account.credits.summaries"),
      value: summaryCredits,
    },
    {
      id: 2,
      name:
        vectorSearchCredits === 1
          ? t("dashboard-page:admin.account.credits.vector-search")
          : t("dashboard-page:admin.account.credits.vector-searches"),
      value: vectorSearchCredits,
    },
    {
      id: 3,
      name:
        customRequestCredits === 1
          ? t("dashboard-page:admin.account.credits.custom-request")
          : t("dashboard-page:admin.account.credits.custom-requests"),
      value: customRequestCredits,
    },
    {
      id: 3,
      name:
        usageCredits === 1
          ? t("dashboard-page:admin.account.credits.usage-credit")
          : t("dashboard-page:admin.account.credits.usage-credits"),
      value: usageCredits.toFixed(2),
    },
  ];

  return (
    <div className="grid max-w-full grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7 text-black">
          {t("dashboard-page:admin.account.credits.title")}
        </h2>
      </div>
      <div className="md:col-span-2">
        <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col p-8">
              <dt className="text-sm font-semibold leading-6 text-gray-600">
                {stat.name}
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
