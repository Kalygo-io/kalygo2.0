import { infoToast } from "@/utility/toasts";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { DeleteAccountModal } from "./deleteAccountComponents/deleteAccountModal";
import { useRouter } from "next/router";

export function DeleteAccount() {
  const { t } = useTranslation();

  const router = useRouter();
  const [deleteAccountOpen, setDeleteAccountOpen] = useState<boolean>(false);

  let jsx = null;

  return (
    <>
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-base font-semibold leading-7 text-black">
            Delete account
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            You can mark your account for deletion here.
          </p>
        </div>

        <div className="flex items-start md:col-span-2">
          <button
            onClick={() => {
              setDeleteAccountOpen(true);
            }}
            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
          >
            Delete my account
          </button>
        </div>
      </div>
      <DeleteAccountModal
        open={deleteAccountOpen}
        cb={(isOpen: boolean) => {
          setDeleteAccountOpen(isOpen);
          router.push("/");
        }}
      />
    </>
  );
}
