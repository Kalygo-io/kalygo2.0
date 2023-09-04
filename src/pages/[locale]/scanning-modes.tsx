import React from "react";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Layout1a from "@/layout/layout1a";

const getStaticProps = makeStaticProps([
  "seo",
  "navbar",
  "common",
  "contract-list",
  "error",
]);
export { getStaticPaths, getStaticProps };

export default function ScanningModes() {
  return (
    <>
      <Layout1a>
        <div className="bg-white px-6 py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
              Kalygo's Document Scanning Modes
            </h1>
            <p className="mt-6 text-xl leading-8"></p>
            <div className="mt-16 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Table of Contents
              </h2>
              <ul className="mt-2">
                <li>1. Each Overall</li>
                <li>2. Each In Chunks</li>
                <li>3. Overall</li>
                <li>4. Per Page</li>
              </ul>

              <ul role="list" className="mt-8 max-w-3xl space-y-8 mx-auto">
                <li>
                  <span>
                    <strong className="font-semibold text-gray-900">1.</strong>{" "}
                  </span>
                  <b>Each Overall</b> - This mode cuts up the data of each file
                  you upload in a batch so that each chunk is within the context
                  limit of the A.I. model you are using. The prompt you specify
                  will be applied to each chunk sequentially with each chunk's
                  completion response passed as context for the subsequent
                  chunk.{" "}
                  <b>
                    This mode is great for reading books or extracting
                    information from linear data.
                  </b>{" "}
                  You can optionally specify a "final prompt" which is useful
                  for polishing the output of scanning across each document one
                  last time before presenting the output.
                </li>
                <li>
                  <span>
                    <strong className="font-semibold text-gray-900">2.</strong>{" "}
                  </span>
                  <b>Each In Chunks</b> - This mode cuts up the data in each
                  file you upload so that each chunk is within the context limit
                  of the A.I. model you are using. The prompt you specify will
                  be applied to each chunk independently of the other chunks ie:
                  in parallel.{" "}
                  <b>
                    This mode is great for generating quick summaries of the
                    sections of each document uploaded in a batch or for
                    performing quick conceptual searches against each document
                    in a batch.
                  </b>
                </li>
                <li>
                  <span>
                    <strong className="font-semibold text-gray-900">3.</strong>{" "}
                  </span>
                  <b>Overall</b> - This mode is the same as `Each Overall` mode
                  except that it issues an additional prompt against the output
                  of each document in a batch.{" "}
                  <b>
                    This mode is great for getting an overall understanding of a
                    collection of documents.
                  </b>
                </li>
                <li>
                  <span>
                    <strong className="font-semibold text-gray-900">4.</strong>{" "}
                  </span>
                  <b>Per Page</b> - This mode is only available for paginated
                  document formats like PDF's. This mode applies a prompt to
                  each page of each document uploaded in a batch.{" "}
                  <b>
                    This mode is great for getting an accurate and traceable
                    overview of a collection of paginated documents.
                  </b>{" "}
                  If the completion output of a page intrigues you, you can
                  easily pull up the source document from which it came to
                  verify its credibility.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Layout1a>
    </>
  );
}
