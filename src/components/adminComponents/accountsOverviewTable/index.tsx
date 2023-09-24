import { AccountTableColumns } from "@/types/AccountTableColumns";
import { ColumnDirection } from "@/types/ColumnDirection";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { Footer } from "./footer";
import { useRouter } from "next/router";

interface P {
  tableState: any;
  setTableState: any;
  accounts: {
    count: number;
    accounts: any[];
  };
  columnDirections: {
    email: ColumnDirection;
    createdAt: ColumnDirection;
    lastLogin: ColumnDirection;
    payMethod: ColumnDirection;
  };
  setColumnDirections: (
    column: AccountTableColumns,
    direction: ColumnDirection
  ) => void;
}

export function AccountsOverviewTable(p: P) {
  const {
    accounts: accountsFromParent,
    columnDirections,
    setColumnDirections,
    tableState,
    setTableState,
  } = p;

  const router = useRouter();

  console.log("accounts", accountsFromParent.accounts);
  console.log("count", accountsFromParent.count);

  const accounts = accountsFromParent.accounts;
  const count = accountsFromParent.count;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    <div
                      onClick={() => {
                        setColumnDirections(
                          "email",
                          columnDirections["email"] === "asc" ? "desc" : "asc"
                        );
                      }}
                      className="group inline-flex cursor-pointer"
                    >
                      Email
                      <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                        {
                          /* prettier-ignore */
                          columnDirections["email"] === "asc" ? (<ChevronDownIcon className="h-5 w-5" aria-hidden="true" />)
                            : (<ChevronUpIcon className="h-5 w-5" aria-hidden="true" />)
                        }
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <div
                      onClick={() => {
                        setColumnDirections(
                          "createdAt",
                          columnDirections["createdAt"] === "asc"
                            ? "desc"
                            : "asc"
                        );
                      }}
                      className="group inline-flex cursor-pointer"
                    >
                      Created at
                      <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                        {
                          /* prettier-ignore */
                          columnDirections["createdAt"] === "asc" ? (<ChevronDownIcon className="h-5 w-5" aria-hidden="true" />)
                            : (<ChevronUpIcon className="h-5 w-5" aria-hidden="true" />)
                        }
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <div className="group inline-flex">Last login</div>
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-0">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {accounts &&
                  Array.isArray(accounts) &&
                  accounts.map((account) => (
                    <tr key={account.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {account.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <time
                          className="mt-1  text-xs leading-5 text-gray-500"
                          dateTime={new Date(
                            account.createdAt
                          ).toLocaleString()}
                        >
                          {new Date(account.createdAt).toLocaleString()}
                        </time>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {account?.Logins?.length > 1 ? (
                          <time
                            className="mt-1  text-xs leading-5 text-gray-500"
                            dateTime={new Date(
                              account.Logins[account.Logins.length - 1]
                            ).toLocaleString()}
                          >
                            {new Date(
                              account.Logins[
                                account.Logins.length - 1
                              ]?.createdAt
                            ).toLocaleString()}
                          </time>
                        ) : (
                          "ø"
                        )}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                        <button
                          type="button"
                          className="text-blue-600 hover:text-blue-500"
                          onClick={() => {
                            router.push(
                              `/dashboard/admin/account-overview?account-id=${account?.id}`
                            );
                          }}
                        >
                          View<span className="sr-only">, {account.name}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Footer
              count={count}
              tableState={tableState}
              setTableState={setTableState}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
