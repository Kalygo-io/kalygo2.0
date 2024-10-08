import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export function EnterprisePricing() {
  const { t } = useTranslation();

  const tiers = [
    {
      name: t("common:enterprise-pricing.tier1_name"),

      id: "tier-enterprise",
      href: "/signup",
      price: { summary: "$0", monthly: "$19,999" },
      description: t("common:enterprise-pricing.tier1_description"),
      features: [
        t("common:enterprise-pricing.tier1_feature1"),
        // t("common:enterprise-pricing.tier1_feature2"),
        t("common:enterprise-pricing.tier1_feature3"),
        t("common:enterprise-pricing.tier1_feature4"),
      ],
      enabled: true,
    },
  ];

  return (
    <div className="bg-white py-24 pb-8 pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl sm:text-center">
          <h2 className="p-8 text-center text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {t("common:enterprise-pricing.title")}
          </h2>
        </div>

        <div className="mt-10 flow-root">
          <div className="isolate flex max-w-sm justify-center divide-y divide-gray-100 sm:mx-auto lg:max-w-lg lg:divide-y-0 mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className="rounded-2xl bg-gray-100 p-16 lg:px-8 xl:px-14 flex flex-col justify-start items-center shadow-xl"
              >
                {/* <h3
                  id={tier.id}
                  className="text-base font-semibold leading-7 text-gray-900"
                >
                  {tier.name}
                </h3> */}
                <p className="mt-0 flex items-baseline gap-x-1">
                  {tier.id === "tier-enterprise" && (
                    <>
                      <span className="text-5xl font-bold tracking-tight text-gray-900">
                        {/* {tier.price.monthly} */}
                        {t("common:enterprise-pricing.contact-us")}
                      </span>
                      {/* <span className="text-sm font-semibold leading-6 text-gray-600">
                        /{t("common:enterprise-pricing.month")}
                      </span> */}
                    </>
                  )}
                </p>
                <p className="mt-10 text-sm font-semibold leading-6 text-gray-900">
                  {tier.description}
                </p>
                <ul
                  role="list"
                  className="mt-6 space-y-3 text-sm leading-6 text-gray-600"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckCircleIcon
                        className="h-6 w-5 flex-none text-blue-600"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
