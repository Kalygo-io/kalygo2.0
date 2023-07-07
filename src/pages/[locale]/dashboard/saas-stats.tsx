import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useTranslation } from "next-i18next";
import LayoutDashboard from "@/layout/layoutDashboard";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import axios from 'axios';

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

interface SaasStatsData {
    totalAccounts: number;
    paidAccountsCount: number;
    verifiedAccountsCount: number;
    totalSummaries: number;
    averageSummariesPerUser: number;
    totalOpenAiCharges: {_sum: {amount: number}};
    // loginsCount
}

export default function SaasStats() {
  const { t } = useTranslation();
  const [statsData, setStatsData] = useState<SaasStatsData | null>(null);

  useEffect(() => {
    const fetchSaasData = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/saas-stats`);
          const { totalAccounts, paidAccountsCount, verifiedAccountsCount, totalSummaries, averageSummariesPerUser, totalOpenAiCharges} = response.data;
          setStatsData({ totalAccounts, paidAccountsCount, verifiedAccountsCount, totalSummaries, averageSummariesPerUser, totalOpenAiCharges });
        } catch (err) {
          console.log(err);
        }
      };      
    fetchSaasData();
  }, []);

  return (
    <>
      <Head>
        <title>{t("seo:dashboard-page-seo-meta-title")}</title>
      </Head>
      <LayoutDashboard>
        <div className="p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {t("dashboard-page:saas-stats.title")}
          </h2>
          {statsData && (
            <div className="flex flex-wrap justify-between border-b border-gray-200 py-4">
              <div className="w-full sm:w-1/2 lg:w-1/4 border-r border-gray-200 px-4 py-2">
                <p className="text-blue-600">Total Accounts:</p>
                <p className="text-gray-900 font-bold">{statsData.totalAccounts}</p>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/4 border-r border-gray-200 px-4 py-2">
                <p className="text-blue-600">Paid Accounts:</p>
                <p className="text-gray-900 font-bold">{statsData.paidAccountsCount}</p>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/4 border-r border-gray-200 px-4 py-2">
                <p className="text-blue-600">Verified Accounts:</p>
                <p className="text-gray-900 font-bold">{statsData.verifiedAccountsCount}</p>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/4 px-4 py-2">
                <p className="text-blue-600">Average Summaries Per User:</p>
                <p className="text-gray-900 font-bold">{statsData.averageSummariesPerUser}</p>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/4 px-4 py-2">
                <p className="text-blue-600">Total OpenAI Charges:</p>
                <p className="text-gray-900 font-bold">${(statsData.totalOpenAiCharges._sum.amount / 100).toFixed(2) || "0.00"}</p>
              </div>
            </div>
          )}
        </div>
      </LayoutDashboard>
    </>
  );
  
}

SaasStats.requireAuth = true;