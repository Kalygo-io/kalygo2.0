"use client";

import Head from "next/head";

import Image from "next/image";
import { useRouter } from "next/router";
import { FullFileBrowser } from "chonky";
import { useAppContext } from "@/context/AppContext";
import LayoutDashboard from "@/layout/layoutDashboard";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";

// import Link from "next/link";
import Link from "@/components/shared/Link"; // monkey patch Link for multi-lang support on static next.js export
import { Fragment, useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/outline";

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

export default function MyDocuments() {
  const { state, dispatch } = useAppContext();
  const { t } = useTranslation();

  const files = [
    { id: "lht", name: "Projects", isDir: true },
    {
      id: "mcd",
      name: "chonky-sphere-v2.png",
      thumbnailUrl: "https://chonky.io/chonky-sphere-v2.png",
    },
  ];
  const folderChain = [{ id: "xcv", name: "Your files", isDir: true }];
  // return (
  //     <div style={{ height: 300 }}>

  //     </div>
  // );

  return (
    <>
      <Head>
        <title>{t("seo:dashboard-page-seo-meta-title")}</title>
      </Head>
      <LayoutDashboard>
        <div className="pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto min-h-screen">
          <FullFileBrowser files={files} folderChain={folderChain} />
        </div>
      </LayoutDashboard>
    </>
  );
}

MyDocuments.requireAuth = true;
