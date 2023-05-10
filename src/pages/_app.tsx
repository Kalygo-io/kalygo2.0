import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

import React from "react";

import { AppWrapper } from "@/context/AppContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-EXRWZ1F1H1"
      />
          
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EXRWZ1F1H1', {
            page_path: window.location.pathname,
          });
        `,
        }}
      />
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </>
  );
}
