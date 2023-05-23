import { infoToast } from "@/utility/toasts";
import { useTranslation } from "next-i18next";

export default function ContractList() {
  const { t } = useTranslation();

  const contracts = [
    {
      name: t("contract-list:escrow"),
      description: t("contract-list:escrow-description"),
      attributes: [t("contract-list:badge-audited")],
      enabled: true,
    },
    {
      name: t("contract-list:tokenization"),
      description: t("contract-list:tokenization-description"),
      attributes: [
        t("contract-list:badge-audited"),
        t("contract-list:badge-popular"),
      ],
      enabled: true,
    },
    {
      name: t("contract-list:lottery"),
      description: t("contract-list:lottery-description"),
      attributes: [t("contract-list:badge-coming-soon")],
    },
    {
      name: t("contract-list:lease"),
      description: t("contract-list:lease-description"),
      attributes: [t("contract-list:badge-coming-soon")],
    },
    {
      name: t("contract-list:vote"),
      description: t("contract-list:vote-description"),
      attributes: [t("contract-list:badge-coming-soon")],
    },
    {
      name: t("contract-list:treasury"),
      description: t("contract-list:treasury-description"),
      attributes: [t("contract-list:badge-coming-soon")],
    },
    {
      name: t("contract-list:marketplace"),
      description: t("contract-list:marketplace-description"),
      attributes: [t("contract-list:badge-coming-soon")],
    },
    {
      name: t("contract-list:bounty"),
      description: t("contract-list:bounty-description"),
      attributes: [t("contract-list:badge-coming-soon")],
    },
    // {
    //   name: t("contract-list:other"),
    //   description: t("contract-list:other-description"),
    //   attributes: [],
    // },
  ];

  return (
    <>
      <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contracts.map((contract) => (
          <li
            key={contract.name}
            className="col-span-1 flex flex-col bg-white border-1 p-4 rounded-lg shadow"
          >
            <h2 className="mb-2 font-bold text-2xl text-gray-900">
              {contract.name}
            </h2>
            <p className="text-md text-justify">{contract.description}</p>
            <div className="flex flex-wrap mt-auto pt-3 text-xs">
              {contract.attributes.map((attr) => {
                return (
                  <span
                    key={attr}
                    className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 mx-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                  >
                    {attr}
                  </span>
                );
              })}
            </div>
            <div className="flex flex-wrap mt-auto pt-3 text-xs">
              <button
                type="button"
                onClick={() => {
                  infoToast(t("contract-list:sign-up-to-try"));
                }}
                disabled={!contract.enabled}
                className="w-full focus:outline-none text-white bg-orange-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 m-auto dark:focus:ring-yellow-900 disabled:opacity-50"
              >
                Create
              </button>
            </div>
          </li>
        ))}
      </div>
    </>
  );
}
