import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";

interface P {
  count: number;
  tableState: {
    page: number;
    perPage: number;
  };
  setTableState: Dispatch<
    SetStateAction<{
      page: number;
      perPage: number;
    }>
  >;
}

export function Footer(p: P) {
  const { count, tableState, setTableState } = p;

  console.log(count, tableState, setTableState);

  const pageButtons = [tableState.page];

  let pageNumber = tableState.page;
  let tmpCounter = 0;
  while (pageNumber > 1 && tmpCounter < 3) {
    tmpCounter++;
    pageNumber--;
    pageButtons.unshift(pageNumber);
  }
  tmpCounter = 0;
  pageNumber = tableState.page;
  while (pageNumber * tableState.perPage <= count && tmpCounter < 3) {
    tmpCounter++;
    pageNumber++;
    pageButtons.push(pageNumber);
  }

  console.log("pageButtons", pageButtons);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <span className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Previous
        </span>
        <span className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Next
        </span>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <select
            id="perPage"
            name="perPage"
            onChange={(e) => {
              console.log(e.target.value);
              setTableState({
                ...tableState,
                perPage: Number.parseInt(e.target.value),
              });
            }}
            className="block w-full rounded-md border-0 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
            defaultValue="20"
          >
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
        <div>
          <p className="text-sm text-gray-700">
            <span className="font-medium">{count}</span> total
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <span className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </span>

            {pageButtons.map((val, idx) => {
              return val === tableState.page ? (
                <span
                  key={idx}
                  onClick={() => {
                    setTableState({
                      ...tableState,
                      page: val,
                    });
                  }}
                  aria-current="page"
                  className="cursor-pointer relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  {val}
                </span>
              ) : (
                <span
                  key={idx}
                  onClick={() => {
                    setTableState({
                      ...tableState,
                      page: val,
                    });
                  }}
                  className="cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  {val}
                </span>
              );
            })}
            <span className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          </nav>
        </div>
      </div>
    </div>
  );
}
