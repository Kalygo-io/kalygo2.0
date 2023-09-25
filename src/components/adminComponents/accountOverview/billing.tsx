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
import { ChargesTable } from "./chargesTable";
import { getAccountChargesFactory } from "@/serviceFactory/getAccountChargesFactory";

interface P {
  account: any;
}

export function Billing(p: P) {
  const [charges, setCharges] = useState<{
    loading: boolean;
    val: any[];
    err: any;
  }>({
    loading: true,
    val: [],
    err: null,
  });

  const { account } = p;

  useEffect(() => {
    async function getAccountChargeHistory() {
      try {
        // debugger;
        const request = getAccountChargesFactory(account.id);
        const response = await request;

        console.log("response.data", response?.data);

        setCharges({
          loading: false,
          val: response?.data?.stripeCharges || [],
          err: null,
        });

        console.log("getAccountChargeHistory");
      } catch (e) {
        console.error(e);
        setCharges({
          loading: false,
          val: [],
          err: e,
        });
      }
    }
    account && getAccountChargeHistory();
  }, [account]);

  let jsx = null;
  if (charges.loading) {
    jsx = <WindowLoader></WindowLoader>;
  } else if (charges.val) {
    jsx = <ChargesTable charges={charges.val} />;
  } else {
    jsx = <ErrorInDashboard />;
  }

  return (
    <>
      <div className="mt-0 flow-root">{jsx}</div>
    </>
  );
}
