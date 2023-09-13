"use client";

import Head from "next/head";
import { useRouter } from "next/router";
import LayoutDashboard from "@/layout/layoutDashboard";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomRequest from "@/components/dashboardComponents/customRequest";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { ErrorInDashboard } from "@/components/shared/errorInDashboard";
import { useGetAccountWithAccessGroups } from "@/utility/hooks/getAccountWithAccessGroups";

const getStaticProps = makeStaticProps([
  "seo",
  "navbar",
  "common",
  "contract-list",
  "error",
  "dashboard-page",
  "toast-messages",
  "id",
]);
export { getStaticPaths, getStaticProps };

export default function CustomRequestResult() {
  const router = useRouter();

  const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);

  const customRequestId = searchParams.get("custom-request-id") || "";
  const { t } = useTranslation();
  const { account, refresh, refreshCount } = useGetAccountWithAccessGroups();
  const [customRequest, setCustomRequest] = useState<{
    val: any;
    loading: boolean;
    err: any;
  }>({
    val: null,
    loading: true,
    err: null,
  });

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/custom-request/${customRequestId}`,
          {
            withCredentials: true,
          }
        );

        setCustomRequest({
          loading: false,
          val: res.data,
          err: null,
        });
      } catch (e) {
        setCustomRequest({
          loading: false,
          val: null,
          err: e,
        });
      }
    }

    fetch();
  }, [refreshCount]);

  let jsx = null;
  if (customRequest.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (customRequest.val) {
    jsx = (
      <CustomRequest
        account={account.val}
        customRequest={customRequest.val}
        refresh={refresh}
        refreshCount={refreshCount}
        showSharing={true}
      />
    );
  } else {
    jsx = <ErrorInDashboard />;
  }

  return (
    <>
      <Head>
        <title>{t("seo:dashboard-page-seo-meta-title")}</title>
      </Head>
      <LayoutDashboard>
        <div className="p-4 pb-0 sm:p-6 lg:p-8 sm:pb-0 lg:pb-0">
          <div className="flex flex-col tems-center xl:pr-96">
            <p className="text-3xl font-bold leading-7 text-gray-900 sm:text-3xl break-words">
              {customRequest?.val?.prompt}
            </p>
            <div className="mt-4 relative xl:pr-96">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-100" />
              </div>
            </div>
          </div>

          <div className="mt-4 flow-root">
            <div className="inline-block min-w-full align-middle">{jsx}</div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
}

CustomRequestResult.requireAuth = true;
