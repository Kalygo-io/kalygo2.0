import { XCircleIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "next-i18next";
import get from "lodash.get";

interface P {
  results: string[];
  query: string;
  reset: () => void;
}

export function SearchSuccess(p: P) {
  const { results, reset, query } = p;

  const { t } = useTranslation();

  const documents = get(results, "documents.0", []);
  const distances = get(results, "distances.0", []);
  const metadatas = get(results, "metadatas.0", []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 flex flex-col flex-center justify-center">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight">
          {query}
        </h2>
      </div>

      <div className="my-2">
        <div>
          <span
            onClick={reset}
            // type="button"
            className="cursor-pointer gap-x-2 rounded-md px-3.5 py-2.5 text-sm font-semibold text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {/* <XCircleIcon className="h-5 w-5" aria-hidden="true" /> */}
            Clear
          </span>
        </div>
      </div>

      <div className="bg-white px-6 pt-8 pb-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <ul role="list" className="divide-y divide-gray-100">
            {documents.map((i, idx) => (
              <li key={idx} className="flex gap-x-4 py-5">
                {/* <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={comment.imageUrl}
                  alt=""
                /> */}
                <div className="flex-auto">
                  <div className="flex items-baseline justify-between gap-x-4">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      Chunk {get(metadatas, `${idx}.index`)}
                    </p>
                    <p className="flex-none text-xs text-gray-600">
                      <span>{distances[idx]}</span>
                      {/* <time dateTime={comment.dateTime}>{comment.date}</time> */}
                    </p>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">
                    {i}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
