import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import LayoutDashboard from '@/layout/layoutDashboard';
import { getStaticPaths, makeStaticProps } from '@/lib/getStatic';
import axios from 'axios';
import { Switch } from '@headlessui/react';

const getStaticProps = makeStaticProps([
  'seo',
  'navbar',
  'common',
  'contract-list',
  'error',
  'dashboard-page',
  'toast-messages',
]);
export { getStaticPaths, getStaticProps };

interface SaasStatsData {
  totalAccounts: number;
  paidAccountsCount: number;
  verifiedAccountsCount: number;
  totalSummaries: number;
  averageSummariesPerUser: number;
  totalOpenAiCharges: { _sum: { amount: number } };
  averageOpenAiChargesPerUser: number;
  monthlyActiveUsers: number;
  averageOpenAiChargesByPlan: Array<{ subscriptionPlan: string, averageAiCharges: number }>;
  totalSearches: number;
  averageSearchesPerUser: number;
}

export default function SaasStats() {
  const { t } = useTranslation();
  const [statsData, setStatsData] = useState<SaasStatsData | null>(null);
  const [isSummaryCredit, setIsSummaryCredit] = useState(true);
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSaasData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/saas-stats`, { withCredentials: true });
        const {
          totalAccounts,
          paidAccountsCount,
          verifiedAccountsCount,
          totalSummaries,
          averageSummariesPerUser,
          totalOpenAiCharges,
          averageOpenAiChargesPerUser,
          monthlyActiveUsers,
          averageOpenAiChargesByPlan,
          totalSearches,
          averageSearchesPerUser,
        } = response.data;
        console.log("TOTAL AI:", totalOpenAiCharges);
        setStatsData({
          totalAccounts,
          paidAccountsCount,
          verifiedAccountsCount,
          totalSummaries,
          averageSummariesPerUser,
          totalOpenAiCharges,
          averageOpenAiChargesPerUser,
          monthlyActiveUsers,
          averageOpenAiChargesByPlan,
          totalSearches,
          averageSearchesPerUser,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchSaasData();
  }, []);

  const allocateSummaryCredits = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/allocate-summary-credits`, 
      {
        email: email,
        amount: amount
      }, 
      { withCredentials: true }
      );
      setEmail('');
      setAmount(0);
      setErrorMessage('Succesful');
    } catch (err) {
      setErrorMessage('Failed');
      console.log(err);
    }
  };

  const allocateSearchCredits = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_HOSTNAME}/api/v1/allocate-search-credits`, 
      {
        email: email,
        amount: amount
      }, 
      { withCredentials: true }
      );
      setEmail('');
      setAmount(0);
      setErrorMessage('Succesful');
    } catch (err) {
      setErrorMessage('Failed');
      console.log(err);
    }
  };

  const renderStatCard = (title: string, value: string | number) => {
    return (
      <div className="flex flex-col text-center">
        <h3 className="mb-2 font-bold text-xl text-blue-500">{title}</h3>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{t('seo:dashboard-page-seo-meta-title')}</title>
      </Head>
      <LayoutDashboard>
        <div className="p-6 lg:p-8">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900 sm:text-3xl">
            {t('dashboard-page:saas-stats.title')}
          </h2>
          {statsData && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="col-span-full bg-white border-2 p-4 rounded-lg shadow">
                <h2 className="mb-2 font-bold text-2xl text-blue-700 underline">Accounts</h2>
                <div className="grid grid-cols-2 gap-4">
                  {renderStatCard("Total Accounts", statsData.totalAccounts)}
                  {renderStatCard("Verified Accounts", statsData.verifiedAccountsCount)}
                  {renderStatCard("Paid Accounts", statsData.paidAccountsCount)}
                  {renderStatCard("MAU", statsData.monthlyActiveUsers)}
                </div>
              </div>
              <div className="col-span-full bg-white border-2 p-4 rounded-lg shadow">
                <h2 className="mb-2 font-bold text-2xl text-blue-700 underline">AI Charges</h2>
                <div className="grid grid-cols-2 gap-4">
                  {renderStatCard("Total OpenAI Charges", `$${statsData.totalOpenAiCharges._sum.amount.toFixed(5)}`)}
                  {renderStatCard("Avg OpenAI Charges/User", `$${statsData.averageOpenAiChargesPerUser.toFixed(5)}`)}
                </div>
              </div>
              <div className="col-span-full bg-white border-2 p-4 rounded-lg shadow">
                <h2 className="mb-2 font-bold text-2xl text-blue-700 underline">Summaries</h2>
                <div className="grid grid-cols-2 gap-4">
                  {renderStatCard("Total Summaries", statsData.totalSummaries)}
                  {renderStatCard("Avg Summaries/User", statsData.averageSummariesPerUser)}
                </div>
              </div>
              <div className="col-span-full bg-white border-2 p-4 rounded-lg shadow">
                <h2 className="mb-2 font-bold text-2xl text-blue-700 underline">Searches</h2>
                <div className="grid grid-cols-2 gap-4">
                  {renderStatCard("Total Searches", statsData.totalSearches)}
                  {renderStatCard("Avg Searches/User", statsData.averageSearchesPerUser)}
                </div>
              </div>
            </div>
          )}
          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-lg font-semibold text-gray-900">
                Email:
              </label>
              <input
                id="email"
                type="email"
                className="mt-2 w-full p-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md sm:text-lg"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-lg font-semibold text-gray-900">
                Amount:
              </label>
              <input
                id="amount"
                type="number"
                className="mt-2 w-full p-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md sm:text-lg"
                placeholder="Amount of credits"
                value={amount}
                onChange={(e) => setAmount(+(e.target.value))}
              />
            </div>
            <div className="mt-2">
              <Switch
                checked={isSummaryCredit}
                onChange={setIsSummaryCredit}
                className={`${isSummaryCredit ? 'bg-orange-400' : 'bg-gray-200'}
                relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${isSummaryCredit ? 'translate-x-5' : 'translate-x-0'}
                  inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                />
              </Switch>
              <span className="ml-2">{isSummaryCredit ? 'Summary Credits' : 'Search Credits'}</span>
            </div>
            <button
              className="w-full px-4 py-2 mt-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
              onClick={isSummaryCredit ? allocateSummaryCredits : allocateSearchCredits}
            >
              Allocate {isSummaryCredit ? 'Summary Credits' : 'Search Credits'}
            </button>
            {errorMessage && <p className="mt-2 font-bold text-lg text-center text-blue-500">{errorMessage}</p>}
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
}

SaasStats.requireAuth = true;
