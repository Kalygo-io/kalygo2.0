import { AccountTableColumns } from "@/types/AccountTableColumns";
import { ColumnDirection } from "@/types/ColumnDirection";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { ChargesTableFooter } from "./chargesTableFooter";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PaidAccountsTableColumns } from "@/types/PaidAccountsTableColumns";

interface P {
  charges: any[];
}

export function ChargesTable(p: P) {
  const { charges } = p;

  return charges?.length > 0 ? (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Charges
          </h3>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the account's charges in Stripe
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <div className="group inline-flex">ID</div>
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    <div className="group inline-flex">Amount</div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <div className="group inline-flex">Captured</div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <div className="group inline-flex">Status</div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <div className="group inline-flex">Disputed</div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <div className="group inline-flex">Refunded</div>
                  </th>
                  {/* <th scope="col" className="relative py-3.5 pl-3 pr-0">
                    <span className="sr-only">View</span>
                  </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {charges &&
                  Array.isArray(charges) &&
                  charges.map((record) => (
                    <tr key={record.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {record.id}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {`${(record.amount / 100).toFixed(2)} ${
                          record.currency
                        }`}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {`${(record.amount_captured / 100).toFixed(2)} ${
                          record.currency
                        }`}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {record.status}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {record.disputed ? "T" : "F"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {record.refunded ? "T" : "F"}
                      </td>
                      {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                        <button
                          type="button"
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View<span className="sr-only">, {record.id}</span>
                        </button>
                      </td> */}
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* <ChargesTableFooter
              count={count}
              tableState={tableState}
              setTableState={setTableState}
            /> */}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>No Charges</>
  );
}
