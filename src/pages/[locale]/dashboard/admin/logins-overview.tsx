import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import LayoutDashboard from "@/layout/layoutDashboard";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { getAccountsFactory } from "@/serviceFactory/getAccountsFactory";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { ErrorInDashboard } from "@/components/shared/errorInDashboard";
import { ColumnDirection } from "@/types/ColumnDirection";
import { AccountTableColumns } from "@/types/AccountTableColumns";
import { LoginsOverviewTable } from "@/components/adminComponents/loginsOverviewTable";
import { LoginsTableColumns } from "@/types/LoginsTableColumns";
import { getLoginsFactory } from "@/serviceFactory/getLoginsFactory";

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

export default function LoginsOverview() {
  const { t } = useTranslation();

  const [logins, setLogins] = useState<{
    loading: boolean;
    val: any;
    err: any;
  }>({
    loading: true,
    val: null,
    err: null,
  });

  const [tableState, setTableState] = useState<{
    page: number;
    perPage: number;
  }>({
    page: 1,
    perPage: 20,
  });

  const [columnDirections, setColumnDirections] = useState<{
    columnToSort: LoginsTableColumns;
    state: Record<LoginsTableColumns, ColumnDirection>;
  }>({
    columnToSort: "createdAt",
    state: {
      email: "asc",
      createdAt: "desc",
    },
  });

  useEffect(() => {
    async function getAccounts() {
      try {
        const request = getLoginsFactory(
          columnDirections.columnToSort,
          columnDirections.state[columnDirections.columnToSort],
          tableState.page - 1,
          tableState.perPage
        );
        const response = await request;
        console.log("response", response);

        setLogins({
          loading: false,
          val: response?.data,
          err: null,
        });
      } catch (e) {
        console.error(e);
        setLogins({
          loading: false,
          val: null,
          err: e,
        });
      }
    }
    getAccounts();
  }, [columnDirections, tableState]);

  let jsx = null;
  if (logins.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (logins.val) {
    jsx = (
      <LoginsOverviewTable
        tableState={tableState}
        setTableState={setTableState}
        logins={logins.val}
        columnDirections={columnDirections.state}
        setColumnDirections={(
          column: LoginsTableColumns,
          direction: ColumnDirection
        ) => {
          setColumnDirections({
            columnToSort: column,
            state: {
              ...columnDirections.state,
              [column]: direction,
            },
          });
        }}
      />
    );
  } else {
    jsx = <ErrorInDashboard />;
  }

  console.log("! logins !", logins);

  return (
    <>
      <Head>
        <title>{t("seo:dashboard-page-seo-meta-title")}</title>
      </Head>
      <LayoutDashboard>
        <div className="p-6 lg:p-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {t("dashboard-page:admin.logins.title")}
              </h2>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
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

LoginsOverview.requireAdmin = true;
