import { MagnifyingGlassIcon, PaperClipIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import get from "lodash.get";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { saveAs } from "file-saver";
import ReactMarkdown from "react-markdown";

interface P {
  ragRequest: {
    id: number;
    createdAt: number;
    filename: string;
    prompt: string;
    completion: string;
  };
}

export default function RagRequest(p: P) {
  const { ragRequest } = p;

  const { t } = useTranslation();

  const [downloadFile, setDownloadFile] = useState<{
    val: any;
    loading: boolean;
    err: any;
  }>();

  useEffect(() => {
    async function downloadFileRequest() {
      //   try {
      //     setDownloadFile({
      //       val: "...",
      //       loading: true,
      //       err: null,
      //     });
      //     const res = await axios.get(
      //       `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/rag/download-original-file/${ragRequest.id}`,
      //       {
      //         withCredentials: true,
      //       }
      //     );
      //     setDownloadFile({
      //       val: res.data,
      //       loading: false,
      //       err: null,
      //     });
      //   } catch (e) {
      //     setDownloadFile({
      //       val: null,
      //       loading: false,
      //       err: e,
      //     });
      //   }
    }

    // downloadFileRequest();
  }, []);

  async function downloadFileRequestAsAttachment() {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/rag/download-original-file-as-attachment/${ragRequest.id}`,
        {
          withCredentials: true,
          responseType: "blob",
        }
      );

      var blob = new Blob([resp.data]);
      saveAs(blob, ragRequest.filename);
    } catch (e) {}
  }

  const documents = get(ragRequest, "results.documents.0", []);
  const distances = get(ragRequest, "results.distances.0", []);
  const metadatas = get(ragRequest, "results.metadatas.0", []);

  return (
    <div>
      <div className="px-4 sm:px-0">
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          {ragRequest?.createdAt
            ? `${t("dashboard-page:rag-result.requested")}: ${new Date(
                ragRequest.createdAt
              ).toLocaleString()}`
            : t("dashboard-page:rag-result.time-requested-unknown")}
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-black">Prompt</dt>
            <dd className="mt-1 text-sm leading-6 text-black sm:col-span-2 sm:mt-0">
              <ReactMarkdown>{ragRequest?.prompt}</ReactMarkdown>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-black">
              Completion
            </dt>
            <dd className="mt-1 text-sm leading-6 text-black sm:col-span-2 sm:mt-0">
              <ReactMarkdown>{ragRequest?.completion}</ReactMarkdown>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {t("dashboard-page:rag-result.kb")}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    {/* <PaperClipIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    /> */}
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        {ragRequest.filename}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button
                      onClick={() => {
                        // downloadFileRequestAsAttachment();
                      }}
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      {t("dashboard-page:rag-result.download")}
                    </button>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
