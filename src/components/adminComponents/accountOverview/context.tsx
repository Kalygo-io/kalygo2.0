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
import { ContextDocumentsTable } from "./contextDocumentTable";
import { getAccountContextDocumentsFactory } from "@/serviceFactory/getAccountContextDocumentsFactory";

interface P {
  account: any;
}

export function Context(p: P) {
  const { account } = p;

  const [refreshCount, refresh] = useState(0);

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
        const request = getAccountContextDocumentsFactory(account?.id);
        const response = await request;

        setContext({
          loading: false,
          val: response?.data?.AccountContext,
          // val: [],
          err: null,
        });
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
  }, [refreshCount]);

  let jsx = null;
  if (context.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (context.val) {
    jsx = (
      <ContextDocumentsTable
        account={account}
        documents={context.val}
        refresh={refresh}
      />
    );
  } else {
    jsx = <ErrorInDashboard />;
  }

  return (
    <>
      <div className="mt-0 flow-root">{jsx}</div>
    </>
  );
}
