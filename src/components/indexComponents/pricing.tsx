import { CheckCircleIcon } from "@heroicons/react/20/solid";
import LinkComponent from "../shared/Link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useRef } from "react";
import { useInView } from "framer-motion";

export function Pricing() {
  const router = useRouter();
  const { t } = useTranslation();

  const tiers = [
    {
      name: t("common:pricing.tier1_name"),

      id: "tier-free",
      href: "/signup",
      price: { summary: "$0", monthly: "$0" },
      description: t("common:pricing.tier1_description"),
      features: [
        t("common:pricing.tier1_feature0"),
        t("common:pricing.tier1_feature1"),
        t("common:pricing.tier1_feature2"),
        t("common:pricing.tier1_feature3"),
        t("common:pricing.tier1_feature4"),
      ],
      enabled: true,
    },
    {
      name: t("common:pricing.tier2_name"),
      id: "tier-standard",
      href: "/signup",
      price: { summary: "+50¢", monthly: "$8.99" },
      description: t("common:pricing.tier2_description"),
      features: [
        t("common:pricing.tier2_feature0"),
        t("common:pricing.tier2_feature1"),
        t("common:pricing.tier2_feature2"),
        t("common:pricing.tier2_feature3"),
        t("common:pricing.tier2_feature4"),
        t("common:pricing.tier2_feature5"),
        // t("common:pricing.tier2_feature6"),
      ],
      enabled: true,
    },
    {
      name: t("common:pricing.tier3_name"),
      id: "tier-premium",
      href: "/signup",
      price: { summary: "ø", monthly: "$15.99" },
      description: t("common:pricing.tier3_description"),
      features: [
        t("common:pricing.tier3_feature0"),
        t("common:pricing.tier3_feature1"),
        t("common:pricing.tier3_feature2"),
        t("common:pricing.tier3_feature3"),
        t("common:pricing.tier3_feature4"),
        t("common:pricing.tier3_feature5"),
      ],
      enabled: true,
    },
  ];

  return (
    <div id="pricing" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl sm:text-center">
          <h2 className="p-8 text-center text-6xl font-bold tracking-tight text-gray-900 sm:text-7xl">
            {t("common:pricing.title")}
          </h2>
        </div>
        <div className="mt-20 flow-root">
          <div className="isolate grid max-w-lg grid-cols-1 gap-y-16 gap-x-8 divide-y divide-gray-100 sm:mx-auto lg:max-w-7xl lg:grid-cols-3 lg:divide-y-0 mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className="rounded-2xl bg-gray-100 pt-16 p-8 lg:px-8 xl:px-14 flex flex-col justify-start items-center shadow-xl"
              >
                <h3
                  id={tier.id}
                  className="text-base font-semibold leading-7 text-gray-900"
                >
                  {tier.name}
                </h3>
                <p className="mt-6 flex items-baseline gap-x-1">
                  {tier.id === "tier-free" && (
                    <>
                      <span className="text-5xl font-bold tracking-tight text-gray-900">
                        {tier.price.summary}
                      </span>
                    </>
                  )}
                  {tier.id === "tier-standard" && (
                    <>
                      <span className="text-5xl font-bold tracking-tight text-gray-900">
                        {tier.price.monthly}
                      </span>
                      {/* <span className="text-sm font-semibold leading-6 text-gray-600">
                        /{t("common:pricing.premium-feature")}
                      </span> */}
                    </>
                  )}
                  {tier.id === "tier-premium" && (
                    <>
                      <span className="text-5xl font-bold tracking-tight text-gray-900">
                        {tier.price.monthly}
                      </span>
                      {/* <span className="text-sm font-semibold leading-6 text-gray-600">
                        /{t("common:pricing.month")}
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
                <div className="h-full w-full flex flex-col justify-end">
                  {["tier-free"].includes(tier.id) && (
                    <button
                      disabled={!tier.enabled}
                      onClick={() => {
                        router.push("/signup");
                      }}
                      aria-describedby={tier.id}
                      className="self-end w-full mt-10 block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
                    >
                      {t("common:pricing.sign-up")}
                    </button>
                  )}

                  {["tier-standard", "tier-premium"].includes(tier.id) && (
                    <button
                      disabled={!tier.enabled}
                      onClick={() => {
                        router.push(tier.href);
                      }}
                      aria-describedby={tier.id}
                      className="w-full mt-10 block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
                    >
                      {t("common:pricing.sign-up")}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
