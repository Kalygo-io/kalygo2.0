import { CheckCircleIcon } from "@heroicons/react/20/solid";
import LinkComponent from "../shared/Link";
import { useRouter } from "next/router";

const tiers = [
  {
    name: "Free",
    id: "tier-free",
    href: "/signup",
    price: { summary: "$0", monthly: "$0" },
    description: "Everything necessary to get started.",
    features: ["Account are free", "Automated support"],
    enabled: true,
  },
  {
    name: "Standard",
    id: "tier-essential",
    href: "/signup",
    price: { summary: "+50¢", monthly: "Coming Soon" },
    description: "Everything in Free, plus more.",
    features: [
      "Pay per summary",
      "TXT files supported",
      "Basic analytics",
      "24hr support",
    ],
    enabled: true,
  },
  {
    name: "God Mode",
    id: "tier-growth",
    href: "/signup",
    price: { summary: "ø", monthly: "Coming Soon" },
    description: "Everything in Standard, plus more.",
    features: [
      "Collaboration Features",
      "More analytics",
      "Custom reporting tools",
    ],
    enabled: false,
  },
];

export function Pricing() {
  const router = useRouter();

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl sm:text-center">
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pricing
          </h2>
        </div>
        {/* <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-center">
          Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et
          quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.
        </p> */}
        <div className="mt-20 flow-root">
          <div className="isolate -mt-16 grid max-w-sm grid-cols-1 gap-y-16 divide-y divide-gray-100 sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-3 lg:divide-x lg:divide-y-0 xl:-mx-4">
            {tiers.map((tier) => (
              <div key={tier.id} className="pt-16 lg:px-8 lg:pt-0 xl:px-14">
                <h3
                  id={tier.id}
                  className="text-base font-semibold leading-7 text-gray-900"
                >
                  {tier.name}
                </h3>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    {tier.price.summary}
                  </span>
                  {tier.id === "tier-free" ? (
                    <></>
                  ) : (
                    <span className="text-sm font-semibold leading-6 text-gray-600">
                      /summary
                    </span>
                  )}
                </p>
                {tier.id === "tier-free" ? (
                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    Our free tier is amazing!
                  </p>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {tier.price.monthly}
                  </p>
                )}
                <button
                  // href={tier.href}
                  disabled={!tier.enabled}
                  onClick={() => {
                    router.push("/signup");
                  }}
                  aria-describedby={tier.id}
                  className="mt-10 block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50"
                >
                  Sign Up
                </button>
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
