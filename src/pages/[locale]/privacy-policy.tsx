import React from "react";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";

const getStaticProps = makeStaticProps([
  "seo",
  "navbar",
  "common",
  "contract-list",
  "error",
]);
export { getStaticPaths, getStaticProps };

export default function TermsOfService() {
  return <div>Privacy Policy</div>;
}
