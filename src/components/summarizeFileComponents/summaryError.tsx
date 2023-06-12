export function SummaryError() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 text-center">
      <p className="text-base font-semibold text-red-600">500</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Error
      </h1>
      <p className="mt-6 text-base leading-7 text-gray-600">
        An error occurred. Is your credit card linked?
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <button
          onClick={() => window.location.reload()}
          className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
