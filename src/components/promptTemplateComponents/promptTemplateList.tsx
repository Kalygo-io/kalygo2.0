import { infoToast } from "@/utility/toasts";
import { useTranslation } from "next-i18next";

export function PromptTemplateList() {
  const { t } = useTranslation();

  const contracts: any[] = [
    // {
    //   name: t("prompt-template-list:1-title"),
    //   description: t("prompt-template-list:1-description"),
    //   attributes: [t("prompt-template-list:badge-audited")],
    //   enabled: true,
    // },
    // {
    //   name: t("prompt-template-list:2-title"),
    //   description: t("prompt-template-list:2-description"),
    //   attributes: [
    //     t("prompt-template-list:badge-audited"),
    //     t("prompt-template-list:badge-popular"),
    //   ],
    //   enabled: true,
    // },
    // {
    //   name: t("prompt-template-list:3-title"),
    //   description: t("prompt-template-list:3-description"),
    //   attributes: [t("prompt-template-list:badge-coming-soon")],
    // },
    // {
    //   name: t("prompt-template-list:4-title"),
    //   description: t("prompt-template-list:4-description"),
    //   attributes: [t("prompt-template-list:badge-coming-soon")],
    // },
    // {
    //   name: t("prompt-template-list:5-title"),
    //   description: t("prompt-template-list:5-description"),
    //   attributes: [t("prompt-template-list:badge-coming-soon")],
    // },
    // {
    //   name: t("prompt-template-list:6-title"),
    //   description: t("prompt-template-list:6-description"),
    //   attributes: [t("prompt-template-list:badge-coming-soon")],
    // },
    // {
    //   name: t("prompt-template-list:7-title"),
    //   description: t("prompt-template-list:7-description"),
    //   attributes: [t("prompt-template-list:badge-coming-soon")],
    // },
    // {
    //   name: t("prompt-template-list:8-title"),
    //   description: t("prompt-template-list:8-description"),
    //   attributes: [t("prompt-template-list:badge-coming-soon")],
    // },
    // {
    //   name: t("contract-list:other"),
    //   description: t("contract-list:other-description"),
    //   attributes: [],
    // },
  ];

  return (
    <>
      <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contracts?.map((contract) => (
          <li
            key={contract.name}
            className="col-span-1 flex flex-col bg-white border-1 p-4 rounded-lg shadow"
          >
            <h2 className="mb-2 font-bold text-2xl text-gray-900">
              {contract.name}
            </h2>
            <p className="text-md text-justify">{contract.description}</p>
            <div className="flex flex-wrap mt-auto pt-3 text-xs">
              {contract.attributes.map((attr: any) => {
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
                  infoToast(t("prompt-template-list:sign-up-to-try"));
                }}
                disabled={!contract.enabled}
                className="w-full focus:outline-none text-white bg-orange-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 m-auto dark:focus:ring-yellow-900 disabled:opacity-50"
              >
                {t("prompt-template-list:select")}
              </button>
            </div>
          </li>
        ))}
      </div>
    </>
  );
}
