"use client";

import Head from "next/head";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import LayoutDashboard from "@/layout/layoutDashboard";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";

import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export
import { useEffect, useState } from "react";
import axios from "axios";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { JobList } from "@/components/queueComponents/jobList";
import { viewQueue } from "@/services/viewQueue";
import get from "lodash.get";
import { useGetAccount } from "@/utility/hooks/getAccount";
import { PromptTemplateList } from "@/components/promptTemplateComponents/promptTemplateList";
import { getPromptsFactory } from "@/serviceFactory/getPromptsFactory";
import { PromptsList } from "@/components/promptTemplateComponents/promptsList";
import { useGetPromptsWithAccessGroups } from "@/utility/hooks/getPromptsWithAccessGroups";

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

export default function Prompts() {
  const { state, dispatch } = useAppContext();
  const { t } = useTranslation();
  const { account } = useGetAccount();

  const { prompts, refresh, refreshCount } = useGetPromptsWithAccessGroups();

  let jsx = null;

  if (prompts.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (prompts.err) {
    jsx = <>Error loading prompts</>;
  } else if (prompts.val) {
    jsx = <PromptsList prompts={prompts.val || []} refresh={refresh} />;
  } else {
    jsx = <>Unknown error</>;
  }

  console.log("RENDER PROMPTS");

  return (
    <>
      <Head>
        <title>{t("seo:dashboard-page-seo-meta-title")}</title>
      </Head>
      <LayoutDashboard account={account.val}>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {t("dashboard-page:prompts.title")}
              </h2>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="mx-2 my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                {jsx}
              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
}

Prompts.requireAuth = true;
