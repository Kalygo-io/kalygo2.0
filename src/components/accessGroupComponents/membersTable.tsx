import { deleteAccountFromAccessGroupFactory } from "@/serviceFactory/deleteAccountFromAccessGroupFactory";
import { useTranslation } from "next-i18next";
import { AddMemberToAccessGroupModal } from "./addMemberToAccessGroupModal";
import { useState } from "react";

interface P {
  accessGroup: any;
  members: any[];
  refresh: any;
}

export function MembersTable(p: P) {
  let { accessGroup, members, refresh } = p;
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  members = members.slice(0, 10);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Members
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Members in this access group
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Add member
          </button>
        </div>
      </div>
      <div className="mx-4 mt-4 sm:-mx-0">
        {members.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Added at
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {members.map((member) => {
                return (
                  <tr key={member.accountId}>
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                      <p>{member.account.email}</p>
                      <dl className="font-normal lg:hidden">
                        <dt className="sr-only">Email</dt>
                        <dd className="mt-1 truncate text-gray-700">
                          <time
                            dateTime={new Date(
                              member.createdAt
                            ).toLocaleString()}
                          >
                            {new Date(member.createdAt).toLocaleString()}
                          </time>
                        </dd>
                      </dl>
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      <time
                        dateTime={new Date(member.createdAt).toLocaleString()}
                      >
                        {new Date(member.createdAt).toLocaleString()}
                      </time>
                    </td>
                    <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={async () => {
                          await deleteAccountFromAccessGroupFactory(
                            member.accountId,
                            member.accessGroupId
                          );
                          refresh((val: number) => val + 1);
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <span className="font-bold">No members found</span>
        )}
      </div>
      <AddMemberToAccessGroupModal
        accessGroupId={accessGroup.id}
        open={modalOpen}
        cb={(isOpen: boolean) => {
          console.log("--- ___ ---");
          setModalOpen(isOpen);
          refresh((val: number) => val + 1);
        }}
      />
    </div>
  );
}
