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

  const [accessGroup, setAccessGroup] = useState<{
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
          `${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/access-group/${accessGroupId}`,
          {
            withCredentials: true,
          }
        );

        setAccessGroup({
          loading: false,
          val: res.data,
          err: null,
        });
      } catch (e) {
        setAccessGroup({
          loading: false,
          val: null,
          err: e,
        });
      }
    }

    fetch();
  }, []);

  let jsx = null;
  if (accessGroup.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (accessGroup.val) {
    jsx = <AccessGroup accessGroup={accessGroup.val} />;
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
            <div className="inline-block min-w-full align-middle">{jsx}</div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
}

AccessGroupPage.requireAuth = true;
