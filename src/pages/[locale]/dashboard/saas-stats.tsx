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
  totalCustomRequests: number;
  averageCustomRequestsPerUser: number;
}

export default function SaasStats() {
  const { t } = useTranslation();
  const [statsData, setStatsData] = useState<SaasStatsData | null>(null);
  const [creditType, setCreditType] = useState('summary');
  const [btnLabel, setBtnLabel] = useState('Summary Credits');
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
          totalCustomRequests,
          averageCustomRequestsPerUser,
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
          totalCustomRequests,
          averageCustomRequestsPerUser,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchSaasData();
  }, []);

  useEffect(() => {
    switch (creditType) {
      case 'summary':
        setBtnLabel('Summary Credits');
        break;
      case 'search':
        setBtnLabel('Search Credits');
        break;
      case 'customRequest':
        setBtnLabel('Custom Request Credits');
        break;
      default:
        setBtnLabel('Summary Credits');
    }
  }, [creditType]);  

  const allocateCredits = async () => {
    try {
      let apiEndpoint;
      if (creditType === 'summary') {
        apiEndpoint = '/api/v1/allocate-summary-credits';
      } else if (creditType === 'search') {
        apiEndpoint = '/api/v1/allocate-search-credits';
      } else if (creditType === 'customRequest') {
        apiEndpoint = '/api/v1/allocate-custom-request-credits';
      }

      if (apiEndpoint) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_HOSTNAME}${apiEndpoint}`,
          {
            email: email,
            amount: amount
          },
          { withCredentials: true }
        );
        setEmail('');
        setAmount(0);
        setErrorMessage('Succesful');
      }
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
                  {renderStatCard("Total OpenAI Charges", `$${statsData?.totalOpenAiCharges?._sum?.amount?.toFixed(5)}`)}
                  {renderStatCard("Avg OpenAI Charges/User", `$${statsData?.averageOpenAiChargesPerUser?.toFixed(5)}`)}
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
            <div className="mt-2">
              <div>
                <input 
                  type="radio" 
                  id="summary-credits" 
                  name="credit-type" 
                  value="summary" 
                  checked={creditType === 'summary'}
                  onChange={() => setCreditType('summary')}
                  className="mr-2 focus:ring-0"
                />
                <label htmlFor="summary-credits">Summary Credits</label>
              </div>
              <div>
                <input 
                  type="radio" 
                  id="search-credits" 
                  name="credit-type" 
                  value="search" 
                  checked={creditType === 'search'}
                  onChange={() => setCreditType('search')}
                  className="mr-2 focus:ring-0"
                />
                <label htmlFor="search-credits">Search Credits</label>
              </div>
              <div>
                <input 
                  type="radio" 
                  id="custom-request-credits" 
                  name="credit-type" 
                  value="customRequest" 
                  checked={creditType === 'customRequest'}
                  onChange={() => setCreditType('customRequest')}
                  className="mr-2 focus:ring-0"
                />
                <label htmlFor="custom-request-credits">Custom Request Credits</label>
              </div>
            </div>
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
            <button
              className="w-full px-4 py-2 mt-2 font-semibold text-white bg-orange-400 rounded-md hover:bg-orange-500"
              onClick={allocateCredits}
            >
              Allocate {btnLabel}
            </button>
            {errorMessage && <p className="mt-2 font-bold text-lg text-center text-blue-500">{errorMessage}</p>}
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
}

SaasStats.requireAuth = true;
