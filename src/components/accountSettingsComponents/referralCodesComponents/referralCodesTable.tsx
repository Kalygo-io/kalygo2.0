import { useAppContext } from "@/context/AppContext";
import { ScanningMode } from "@/types/ScanningMode";
import get from "lodash.get";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

interface P {
  referralCodes: any;
}

export function ReferralCodesTable(p: P) {
  let { referralCodes } = p;
  const { t } = useTranslation();

  referralCodes = referralCodes ? referralCodes?.slice(0, 40) : [];

  console.log("referralCodes", referralCodes);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="-mx-4 mt-4 sm:-mx-0">
        {referralCodes?.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Code
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Created at
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {referralCodes.map((code: any) => {
                return (
                  <tr key={code.code}>
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                      <p>{code.code}</p>
                      <dl className="font-normal lg:hidden">
                        <dt className="sr-only">Created at</dt>
                        <dd className="mt-1 truncate text-gray-700">
                          {code.createdAt}
                        </dd>
                      </dl>
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      {new Date(code.createdAt).toLocaleString()}
                    </td>
                    <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${process.env
                              .NEXT_PUBLIC_HOSTNAME!}/signup?referral-code=${
                              code.code
                            }`
                          );
                        }}
                      >
                        {t("dashboard-page:settings.referral-codes.link")}
                        <span className="sr-only">{code.id}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          "No codes found"
        )}
      </div>
    </div>
  );
}
