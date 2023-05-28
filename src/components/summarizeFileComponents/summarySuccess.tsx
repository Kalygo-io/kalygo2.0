import { XCircleIcon } from "@heroicons/react/24/outline";

interface P {
  fileName: string;
  summary: string;
  reset: () => void;
}

export function SummarySuccess(p: P) {
  const { fileName, summary, reset } = p;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
        {fileName}
      </h3>
      <>
        <div className="flex flex-col justify-center m-2">
          <div>
            <button
              onClick={reset}
              type="button"
              className="inline-flex items-center gap-x-2 rounded-md bg-orange-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Clear
              <XCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </>
      <div className="bg-white px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <p className="text-base font-semibold leading-7 text-blue-600">
            Summary
          </p>
          <p className="mt-6 text-xl leading-8">{summary}</p>
        </div>
      </div>
    </div>
  );
}
