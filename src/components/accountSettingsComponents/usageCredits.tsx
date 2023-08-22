import { useTranslation } from "next-i18next";

interface P {
  account: {
    usageCredits: number;
  };
}

export function UsageCredits(p: P) {
  const {
    account: { usageCredits },
  } = p;
  const { t } = useTranslation();

  const stats = [
    {
      id: 1,
      name:
        usageCredits === 1
          ? t("dashboard-page:settings.usage-credits.credit")
          : t("dashboard-page:settings.usage-credits.credits"),
      value: usageCredits,
    },
  ];

  return (
    <div className="grid max-w-full grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7 text-black">
          {t("dashboard-page:settings.usage-credits.title")}
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
