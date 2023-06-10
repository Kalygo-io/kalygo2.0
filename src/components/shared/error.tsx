import React, { ReactNode } from "react";

// import Link from "next/link";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export

import { useTranslation } from "next-i18next";

export function Error() {
  const { t } = useTranslation();

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-blue-600">400</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {t("error:an-error-occurred")}
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          {t("error:looking-into-it")}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => {
              window.location.replace("/");
            }}
          >
            {t("error:back-to-home")}
          </button>
          <Link href="/" className="text-sm font-semibold text-gray-900">
            {t("error:contact-suppport")} <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
