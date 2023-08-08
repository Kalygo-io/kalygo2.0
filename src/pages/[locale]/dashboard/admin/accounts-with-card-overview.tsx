import React, { useEffect, useState } from "react";
import Head from "next/head";
import LayoutDashboard from "@/layout/layoutDashboard";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { ErrorInDashboard } from "@/components/shared/errorInDashboard";
import { ColumnDirection } from "@/types/ColumnDirection";
import { PaidAccountsTableColumns } from "@/types/PaidAccountsTableColumns";
import { getAccountsWithCardFactory } from "@/serviceFactory/getAccountsWithCardFactory";
import { AccountsWithCardTable } from "@/components/adminComponents/accountsWithCardTable";

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

export default function AccountsWithCardOverview() {
  const { t } = useTranslation();

  const [accountsWithCard, setAccountsWithCard] = useState<{
    loading: boolean;
    val: any;
    err: any;
  }>({
    loading: true,
    val: null,
    err: null,
  });

  const [tableStateA, setTableStateA] = useState<{
    page: number;
    perPage: number;
  }>({
    page: 1,
    perPage: 20,
  });

  const [columnDirectionsA, setColumnDirectionsA] = useState<{
    columnToSort: PaidAccountsTableColumns;
    state: Record<PaidAccountsTableColumns, ColumnDirection>;
  }>({
    columnToSort: "createdAt",
    state: {
      email: "asc",
      createdAt: "desc",
      payMethod: "desc",
    },
  });

  useEffect(() => {
    async function getPaidAccounts() {
      try {
        setAccountsWithCard({
          loading: true,
          val: null,
          err: null,
        });

        const requestA = getAccountsWithCardFactory(
          columnDirectionsA.columnToSort,
          columnDirectionsA.state[columnDirectionsA.columnToSort],
          tableStateA.page - 1,
          tableStateA.perPage
        );

        const response = await requestA;

        setAccountsWithCard({
          loading: false,
          val: response?.data,
          err: null,
        });
      } catch (e) {
        console.error(e);
        setAccountsWithCard({
          loading: false,
          val: null,
          err: e,
        });
      }
    }
    getPaidAccounts();
  }, [columnDirectionsA, tableStateA]);

  let jsx = null;
  if (accountsWithCard.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (accountsWithCard.val) {
    jsx = (
      <>
        <AccountsWithCardTable<PaidAccountsTableColumns>
          tableState={tableStateA}
          setTableState={setTableStateA}
          recordsInfo={accountsWithCard.val}
          columnDirections={columnDirectionsA.state}
          setColumnDirections={(
            column: PaidAccountsTableColumns,
            direction: ColumnDirection
          ) => {
            setColumnDirectionsA({
              columnToSort: column,
              state: {
                ...columnDirectionsA.state,
                [column]: direction,
              },
            });
          }}
        />
      </>
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
        <div className="p-6 lg:p-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {t("dashboard-page:admin.paid-accounts.title")}
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

AccountsWithCardOverview.requireAdmin = true;
