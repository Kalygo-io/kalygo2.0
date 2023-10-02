"use client";

import "react-datetime/css/react-datetime.css";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/summarizeFileForm.css";
import "@/styles/customRequestOnFilesForm.css";
import "@/styles/landingPageHero.scss";
import "@/styles/summary-v2-markdown.scss";
import "@/styles/summary-v2.css";
import "@/styles/custom-request-markdown.scss";
import "@/styles/custom-request.css";

import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { ToastContainer } from "react-toastify";
import React from "react";

import { AppWrapper } from "@/context/AppContext";
import Head from "next/head";
import ErrorBoundary from "@/components/shared/errorBoundary";
import { AuthGuard } from "@/guards/AuthGuard";

import type { NextComponentType } from "next"; //Import Component type

import { pdfjs } from "react-pdf";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AdminGuard } from "@/guards/AdminGuard";

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.js`;

// Add custom appProp type then use union to add it
type CustomAppProps = AppProps & {
  Component: NextComponentType & {
    requireAuth?: boolean;
    requireAdmin?: boolean;
  }; // add auth type
};

const App = function ({ Component, pageProps }: CustomAppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:title" content="Kalygo" />
        <meta
          property="og:description"
          content="Kalygo is an open source, cloud-agnostic platform for A.I. assisted Legal eDiscovery."
        />
        <meta property="og:image" content="/kalygo_new_logo-512x512.png" />
        <link rel="apple-touch-icon" href="/kalygo_new_logo-192x192.png" />
        <meta
          name="description"
          content="Kalygo is an open source, cloud-agnostic platform for A.I. assisted Legal eDiscovery."
        />
        <meta
          name="keywords"
          content="eDiscovery, Legal eDiscovery, eDiscovery software, eDiscovery platform, Legal tech solutions, eDiscovery collection, eDiscovery processing, eDiscovery review, eDiscovery production, eDiscovery presentation, Litigation support software, Legal data management, Legal case management, Legal data analytics, Cloud-based eDiscovery, On-premise eDiscovery, AI-powered eDiscovery, eDiscovery automation, eDiscovery OCR (Optical Character Recognition), Legal document review software, GDPR eDiscovery, FRCP (Federal Rules of Civil Procedure) compliance, eDiscovery best practices, Data retention policies, Reducing eDiscovery costs, eDiscovery for small firms, eDiscovery scalability, eDiscovery data security, Efficient eDiscovery workflow"
        />
      </Head>

      <ErrorBoundary>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <AppWrapper>
            {Component.requireAuth ? (
              <AuthGuard>
                <Component {...pageProps} />
              </AuthGuard>
            ) : Component.requireAdmin ? (
              <AdminGuard>
                <Component {...pageProps} />
              </AdminGuard>
            ) : (
              // public page
              <Component {...pageProps} />
            )}
          </AppWrapper>
        </GoogleOAuthProvider>
        <ToastContainer />
      </ErrorBoundary>
    </>
  );
};

export default appWithTranslation(App);
