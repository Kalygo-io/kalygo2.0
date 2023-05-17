"use client";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";

import { appWithTranslation } from "next-i18next";

import { ToastContainer } from "react-toastify";

import React from "react";

import { AppWrapper } from "@/context/AppContext";
import Head from "next/head";
import ErrorBoundary from "@/components/shared/errorBoundary";

const App = function ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:title" content="Kalygo" />
        <meta
          property="og:description"
          content="Kalygo 2.0 is a low-code contract management platform. All code on the platform is open source, reusable, and free. Enjoy Kalygo's library of contracts, reusable widgets, and A.I. assistance features today!"
        />
        <meta property="og:image" content="/logo540.png" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <meta
          name="description"
          content="Kalygo is a platform for managing your contracts with insight and ease."
        />
      </Head>

      <ErrorBoundary>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
        <ToastContainer />
      </ErrorBoundary>
    </>
  );
};

export default appWithTranslation(App);
