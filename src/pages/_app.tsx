import "@/styles/globals.css";
import type { AppProps } from "next/app";

import React from "react";

import { AppWrapper } from "@/context/AppContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </>
  );
}
