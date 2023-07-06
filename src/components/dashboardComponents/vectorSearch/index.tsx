import { MagnifyingGlassIcon, PaperClipIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import get from "lodash.get";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { saveAs } from "file-saver";

interface P {
  vectorSearch: {
    id: number;
    createdAt: number;
    filename: string;
    query: string;
    results: {
      ids: any;
      distances: any;
      documents: any;
      embeddings: any;
      metadata: any;
    };
  };
}

export default function VectorSearch(p: P) {
  const { vectorSearch } = p;

  const { t } = useTranslation();

  const [downloadFile, setDownloadFile] = useState<{
    val: any;
    loading: boolean;
    err: any;
  }>();

  useEffect(() => {
    async function downloadFileRequest() {
      try {
        setDownloadFile({
          val: "...",
          loading: true,
          err: null,
        });

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/vector-search/download-original-file/${vectorSearch.id}`,
          {
            withCredentials: true,
          }
        );

        setDownloadFile({
          val: res.data,
          loading: false,
          err: null,
        });
      } catch (e) {
        setDownloadFile({
          val: null,
          loading: false,
          err: e,
        });
      }
    }

    downloadFileRequest();
  }, []);

  async function downloadFileRequestAsAttachment() {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/vector-search/download-original-file-as-attachment/${vectorSearch.id}`,
        {
          withCredentials: true,
          responseType: "blob",
        }
      );

      var blob = new Blob([resp.data]);
      saveAs(blob, vectorSearch.filename);
    } catch (e) {}
  }

  const documents = get(vectorSearch, "results.documents.0", []);
  const distances = get(vectorSearch, "results.distances.0", []);
  const metadatas = get(vectorSearch, "results.metadatas.0", []);

  return (
    <div>
      <div className="px-4 sm:px-0">
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          {vectorSearch?.createdAt
            ? `Requested: ${new Date(vectorSearch.createdAt)}`
            : `Time summary was requested is unknown`}
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {t("dashboard-page:vector-search.vector-search-success.filename")}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {/* {vectorSearch?.filename} */}
              <ul role="list" className="divide-y divide-gray-100">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        {vectorSearch.filename}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button
                      onClick={() => {
                        downloadFileRequestAsAttachment();
                      }}
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      {t(
                        "dashboard-page:vector-search.vector-search-success.download"
                      )}
                    </button>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
      <div>
        <div className="lg:grid grid-cols-3 flex flex-col grid-rows-1 p-8">
          {/* Left sidebar & main wrapper */}
          <div className="flex-1 flex justify-center lg:order-1 order-2 col-span-2">
            <div
              className={`px-4 py-2 sm:px-6 lg:pl-8 xl:pl-6 overflow-scroll mx-1 flex w-full shadow-sm rounded-md border-2`}
              style={{
                height: `calc(100vh - ${0}px)`, // 88 is the top nav && p8 == 2rem == 64px of padding to adjust for the padding around the <main></main> panel
                maxWidth: `calc(80vw - ${0}px)`,
              }}
            >
              {downloadFile?.val}
            </div>
          </div>

          <div className="shrink-0 border-b lg:border-gray-200 px-4 mb-4 lg:border-l lg:border-b-0 lg:pr-8 xl:pr-4 lg:order-2 order-1 col-span-1">
            {/* Right column area */}
            <form className="flex flex-col justify-center items-center w-full">
              <textarea
                rows={1}
                value={vectorSearch.query}
                id="query"
                readOnly
                placeholder="Similarity search"
                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
              />

              {/* <div>
                <button className="inline-flex items-center gap-x-2 rounded-md bg-blue-600 m-2 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                  <MagnifyingGlassIcon className="h-4 w-4" />
                </button>
              </div> */}
            </form>

            <ul role="list" className="divide-y divide-gray-100">
              {documents.map((i: any, idx: number) => (
                <li key={idx} className="flex gap-x-4 py-5">
                  <div className="flex-auto">
                    <div className="flex items-baseline justify-between gap-x-4">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        Matched Chunk {get(metadatas, `${idx}.index`)}
                      </p>
                      <p className="flex-none text-xs text-gray-600">
                        <span>{distances[idx]}</span>
                        {/* <time dateTime={comment.dateTime}>{comment.date}</time> */}
                      </p>
                    </div>
                    <CopyToClipboard
                      text={i}
                      onCopy={() => console.log("copied")}
                    >
                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600 cursor-pointer">
                        {i}
                      </p>
                    </CopyToClipboard>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
