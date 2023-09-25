import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import LayoutDashboard from "@/layout/layoutDashboard";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { AccountOverview } from "@/components/adminComponents/accountOverview/index";
import { getAccountsFactory } from "@/serviceFactory/getAccountsFactory";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { ErrorInDashboard } from "@/components/shared/errorInDashboard";
import { ColumnDirection } from "@/types/ColumnDirection";
import { AccountTableColumns } from "@/types/AccountTableColumns";
import { getAccountByIdFactory } from "@/serviceFactory/getAccountByIdFactory";
import { useRouter } from "next/router";
import { ContextDocumentTable } from "./contextDocumentTable";

export function Context() {
  const [context, setContext] = useState<{
    loading: boolean;
    val: any[];
    err: any;
  }>({
    loading: false,
    val: [],
    err: null,
  });

  useEffect(() => {
    async function getAccountContextDocuments() {
      try {
        // const getAccountRequest = getAccountByIdFactory(accountId);
        // const getAccountResponse = await getAccountRequest;
        // console.log("getAccountResponse", getAccountResponse);

        setContext({
          loading: false,
          //   val: getAccountResponse?.data,
          val: [],
          err: null,
        });

        console.log("getAccountContextDocuments");
      } catch (e) {
        // console.error(e);
        setContext({
          loading: false,
          val: [],
          err: e,
        });
      }
    }
    getAccountContextDocuments();
  }, []);

  let jsx = null;
  if (context.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (context.val) {
    jsx = <ContextDocumentTable documents={context.val} />;
  } else {
    jsx = <ErrorInDashboard />;
  }

  return (
    <>
      <div className="mt-0 flow-root">{jsx}</div>
    </>
  );
}
