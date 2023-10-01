import { WindowLoader } from "@/components/shared/WindowLoader";
import LayoutDashboard from "@/layout/layoutDashboard";
import axios from "axios";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ErrorInDashboard } from "@/components/shared/errorInDashboard";
import { AccessGroup } from "@/components/accessGroupComponents/accessGroup";
import { useGetAccessGroups } from "@/utility/hooks/getAccessGroups";

const getStaticProps = makeStaticProps([
  "seo",
  "navbar",
  "common",
  "contract-list",
  "error",
  "dashboard-page",
  "toast-messages",
]);
export { getStaticPaths, getStaticProps };

export default function AccessGroupPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);
  const accessGroupId = searchParams.get("access-group-id") || "";

  const { accessGroup, refresh } = useGetAccessGroups(accessGroupId);

  let jsx = null;
  if (accessGroup.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (accessGroup.val) {
    jsx = <AccessGroup accessGroup={accessGroup.val} refresh={refresh} />;
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
          <div className="mt-4 flow-root">
            <div className="mx-auto w-full max-w-7xl">{jsx}</div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
}

AccessGroupPage.requireAuth = true;
