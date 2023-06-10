import { XCircleIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "next-i18next";
import get from "lodash.get";

interface P {
  // fileName: string;
  results: string[];
  query: string;
  // originalLength: number;
  // condensedLength: number;
  reset: () => void;
}

export function SearchSuccess(p: P) {
  const { results, reset, query } = p;

  const { t } = useTranslation();

  // debugger;

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
            className="cursor-pointer gap-x-2 rounded-md px-3.5 py-2.5 text-sm font-semibold text-blue-700 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {/* <XCircleIcon className="h-5 w-5" aria-hidden="true" /> */}
            Clear
          </span>
        </div>
      </div>

      <div className="bg-white px-6 pt-8 pb-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          {/* {results?.map((i: any, idx) => { */}
          {/* return (
              <> */}
          {/* <p key={idx} className="mt-6 text-xl leading-8">
                  {get(i, "0.pageContent", null)}
                </p>
                <span>{get(i, "1", null)}</span> */}
          {/* <pre> */}
          {JSON.stringify(results, null, 2)}
          {/* </pre>
              </>
            );
          })} */}
        </div>
      </div>
    </div>
  );
}
