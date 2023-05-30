import { XCircleIcon } from "@heroicons/react/24/outline";

interface P {
  fileName: string;
  summary: string[];
  originalLength: number;
  condensedLength: number;
  reset: () => void;
}

export function SummarySuccess(p: P) {
  const { fileName, summary, reset, originalLength, condensedLength } = p;

  // debugger;

  return (
    <div className="px-4 sm:px-6 lg:px-8 flex flex-col flex-center justify-center">
      <h3 className="mx-auto text-base font-semibold leading-6 text-gray-900">
        {fileName}
      </h3>

      <div className="mx-auto my-2">
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

      <div className="mx-auto my-2">
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {[
            { name: "Original Length", stat: originalLength },
            {
              name: "Condensed Length",
              stat: condensedLength,
            },
          ].map((item) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            >
              <dt className="truncate text-sm font-medium text-gray-500">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {item.stat}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="bg-white px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <h3 className="text-xl font-semibold leading-7 text-blue-600">
            Summary
          </h3>
          {summary.map((i, idx) => {
            return (
              <p key={idx} className="mt-6 text-xl leading-8">
                {i}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
