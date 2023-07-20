"use client";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/summarizeFileForm.css";
import "@/styles/customRequestOnFilesForm.css";
import "@/styles/landingPageHero.scss";
import "@/styles/summary-v2-markdown.scss";

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
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.js`;

// Add custom appProp type then use union to add it
type CustomAppProps = AppProps & {
  Component: NextComponentType & { requireAuth?: boolean }; // add auth type
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
          content="Kalygo 2.0 is a app for high-quality document summarization, vector search, and collaboration. All code on the platform is open source, reusable, and free. Enjoy Kalygo's suite of tools and A.I. assistance features today!"
        />
        <meta property="og:image" content="/logo540.png" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <meta
          name="description"
          content="Kalygo is a platform for managing your contracts with insight and ease."
        />
      </Head>

      <ErrorBoundary>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}> 
          <AppWrapper>
            {Component.requireAuth ? (
              <AuthGuard>
                <Component {...pageProps} />
              </AuthGuard>
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
