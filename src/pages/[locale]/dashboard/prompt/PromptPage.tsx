"use client";
import Head from "next/head";
import { useRouter } from "next/router";
import LayoutDashboard from "@/layout/layoutDashboard";
import { useTranslation } from "next-i18next";
import { Prompt } from "@/components/dashboardComponents/prompt";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { ErrorInDashboard } from "@/components/shared/errorInDashboard";
import { useGetAccountWithAccessGroups } from "@/utility/hooks/getAccountWithAccessGroups";
import { useGetPrompt } from "@/utility/hooks/getPrompt";
import { LinkIcon } from "@heroicons/react/24/outline";

export default function PromptPage() {
  const router = useRouter();

  const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);

  const promptId = searchParams.get("prompt-id") || "";
  const { t } = useTranslation();
  const { account } = useGetAccountWithAccessGroups();
  const { prompt, refresh, refreshCount } = useGetPrompt(parseInt(promptId));

  let jsx = null;
  if (prompt.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (prompt.val) {
    jsx = (
      <Prompt
        account={account.val}
        prompt={prompt.val}
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
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-7 text-gray-900">
                {t("dashboard-page:prompt.title")}
              </h1>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${process.env.NEXT_PUBLIC_HOSTNAME}/dashboard/custom-request-result/share?custom-request-id=${customRequest.id}`
                    );
                  }}
                >
                  <LinkIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={() => {
                    // setShareModalOpen(true);
                  }}
                >
                  <ShareIcon className="h-6 w-6" />
                </button>
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
PromptPage.requireAuth = true;
