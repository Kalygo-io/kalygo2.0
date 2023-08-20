import { useTranslation } from "next-i18next";
import ReactMarkdown from "react-markdown";
import { ScanningMode } from "@/types/ScanningMode";

interface P {
  customRequest: any;
}

export default function CustomRequest(p: P) {
  const { customRequest } = p;
  const { t } = useTranslation();

  return (
    <div>
      <div className="px-4 sm:px-0">
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          {customRequest?.createdAt
            ? `${t("dashboard-page:custom-request.requested")}: ${new Date(
                customRequest.createdAt
              )}`
            : t("dashboard-page:custom-request.time-requested-unknown")}
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {t("dashboard-page:custom-request.filenames")}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul>
                {customRequest?.files?.map((f: any) => {
                  return <li key={f.originalname}>{f.originalname}</li>;
                })}
              </ul>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {t("dashboard-page:custom-request.prompt")}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {customRequest?.prompt}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {t("dashboard-page:custom-request.total-completion-response")}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {customRequest.mode === ScanningMode.PRIOR_TO_TRACKING_MODE &&
                JSON.stringify(customRequest.completionResponse, null, 2)}
              {customRequest.mode === ScanningMode.EACH_FILE_IN_CHUNKS &&
                customRequest?.completionResponse.map((i: any, idx: any) => {
                  {
                    return (
                      <div key={idx}>
                        <h3 className="text-lg">
                          <b>{i.file}</b>
                        </h3>
                        <ul>
                          {i?.summary?.map((j: any, idx: any) => {
                            return (
                              <li key={idx} className="mt-2">
                                {i?.summary.length > 1 &&
                                  `(Part ${j.chunk + 1})`}
                                <ReactMarkdown className="summary-v2-markdown">
                                  {j.chunkSummary}
                                </ReactMarkdown>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  }
                })}
              {/* {customRequest?.completionResponse.map((i: any, idx: any) => {
                return (
                  <div key={i.file}>
                    <b>{i.file}</b>
                    <ul>
                      {i?.response?.map((i: any, idx: any) => {
                        return (
                          <li className="mt-2" key={i.part}>
                            <ReactMarkdown className="custom-request-markdown">
                              {i.completionResponse}
                            </ReactMarkdown>
                          </li>
                        );
                      })}
                    </ul>
                    <br />
                  </div>
                );
              })} */}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
