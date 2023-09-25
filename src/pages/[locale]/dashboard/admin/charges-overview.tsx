import React, { useEffect, useState } from "react";
import Head from "next/head";
import LayoutDashboard from "@/layout/layoutDashboard";
import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { WindowLoader } from "@/components/shared/WindowLoader";
import { ErrorInDashboard } from "@/components/shared/errorInDashboard";
import { ColumnDirection } from "@/types/ColumnDirection";
import { PaidAccountsTableColumns } from "@/types/PaidAccountsTableColumns";
import { ChargesTable } from "@/components/adminComponents/chargesTable";
import { getChargesFactory } from "@/serviceFactory/getChargesFactory";

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

export default function PaidAccountsOverview() {
  const { t } = useTranslation();

  const [charges, setCharges] = useState<{
    loading: boolean;
    val: any;
    err: any;
  }>({
    loading: true,
    val: null,
    err: null,
  });

  const [tableStateB, setTableStateB] = useState<{
    page: number;
    perPage: number;
  }>({
    page: 1,
    perPage: 20,
  });

  const [columnDirectionsB, setColumnDirectionsB] = useState<{
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
        setCharges({
          loading: true,
          val: null,
          err: null,
        });

        const request = getChargesFactory(
          columnDirectionsB.columnToSort,
          columnDirectionsB.state[columnDirectionsB.columnToSort],
          tableStateB.page - 1,
          tableStateB.perPage
        );

        const response = await request;

        setCharges({
          loading: false,
          val: response?.data,
          err: null,
        });
      } catch (e) {
        console.error(e);
        setCharges({
          loading: false,
          val: null,
          err: e,
        });
      }
    }
    getPaidAccounts();
  }, [columnDirectionsB, tableStateB]);

  let jsx = null;
  if (charges.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (charges.val) {
    jsx = (
      <ChargesTable<PaidAccountsTableColumns>
        tableState={tableStateB}
        setTableState={setTableStateB}
        recordsInfo={charges.val}
        columnDirections={columnDirectionsB.state}
        setColumnDirections={(
          column: PaidAccountsTableColumns,
          direction: ColumnDirection
        ) => {
          setColumnDirectionsB({
            columnToSort: column,
            state: {
              ...columnDirectionsB.state,
              [column]: direction,
            },
          });
        }}
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
        <div className="p-6 lg:p-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {t("dashboard-page:admin.charges.title")}
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

PaidAccountsOverview.requireAdmin = true;
