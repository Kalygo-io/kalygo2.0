import { round } from "@/utility/Math/round";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "next-i18next";
import ReactMarkdown from "react-markdown";

interface P {
  summary: any;
}

export default function SummaryV2(p: P) {
  const { summary } = p;
  const { t } = useTranslation();

  return (
    <div>
      <main className="lg:pl-8">
        <div className="xl:pr-96">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            {/* Main area */}
            <div className="mt-1 text-sm leading-6 text-gray-700 sm:mt-0">
              {/* {summary?.content?.split("\n\n").map((i: any, idx: any) => {
                return (
                  <div key={idx}>
                    <p>{i}</p>
                    <br />
                  </div>
                );
              })} */}

              {/* <ReactMarkdown>{summary?.completionResponse}</ReactMarkdown> */}

              {summary?.completionResponse.map((i: any, idx: any) => {
                return (
                  <div key={i.file}>
                    <span>
                      <InformationCircleIcon className="h-4 w-4 inline" />
                      &nbsp;
                      <b>{i.file}</b>
                    </span>

                    <ul>
                      {i?.response?.map((i: any, idx: any) => {
                        return (
                          <li className="mt-2" key={i.part}>
                            {/* (Part {i.part + 1}) */}
                            <ReactMarkdown className="summary-v2-markdown">
                              {i.completionResponse}
                            </ReactMarkdown>
                          </li>
                        );
                      })}
                    </ul>
                    <br />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <aside className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 px-4 pt-20 pb-6 sm:px-6 lg:px-8 xl:block">
        {/* Secondary column (hidden on smaller screens) */}
        <div>
          {/* <div className="px-4 sm:px-0">
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              {summary?.createdAt
                ? `${t("dashboard-page:summary.requested")}: ${new Date(
                    summary.createdAt
                  )}`
                : t("dashboard-page:summary.time-requested-unknown")}
            </p>
          </div> */}
          <div className="mt-6">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {/* {t("dashboard-page:summary-v2.prompt")} */}
                  {t("dashboard-page:summary.requested")}:
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:m-0 p-0">
                  {/* <ReactMarkdown>{summary?.prompt}</ReactMarkdown> */}
                  {summary?.createdAt
                    ? `${new Date(summary.createdAt)}`
                    : t("dashboard-page:summary.time-requested-unknown")}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </aside>
    </div>
  );
}
