import React from "react";

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProps } from "@/lib/getStatic";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";
import Head from "next/head";
import Layout1 from "@/layout/layout1";
import Layout1a from "@/layout/layout1a";
import LinkComponent from "@/components/shared/Link";
import { useRouter } from "next/router";

const getStaticProps = makeStaticProps([
  "seo",
  "navbar",
  "about",
  "common",
  "blog",
  "error",
]);
export { getStaticPaths, getStaticProps };

export default function Blog() {
  const { t } = useTranslation();
  const router = useRouter();

  const posts = [
    {
      id: 1,
      title: t("blog:blog.scanning-modes.title"),
      articlePath: "/blog/1-scanning-modes",
      description: t("blog:blog.scanning-modes.description"),
      date: "9-4-2023",
      datetime: "2023-09-04",
      category: t("blog:blog.scanning-modes.category"),
      author: {
        name: t("blog:blog.scanning-modes.author.name"),
        role: t("blog:blog.scanning-modes.author.role"),
      },
    },
  ];

  return (
    <>
      <Head>
        <title>{t("seo:blog-page-title")}</title>
        <meta name="description" content={t("seo:blog-page-description")!} />
      </Head>

      <Layout1 disableStickyTopNav={true}>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t("blog:blog.title")}
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                {t("blog:blog.subtitle")}
              </p>
              <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
                {posts.map((post) => (
                  <article
                    onClick={() => {
                      router.push(post.articlePath);
                    }}
                    key={post.id}
                    className="flex max-w-xl flex-col items-start justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime={post.datetime} className="text-gray-500">
                        {post.date}
                      </time>
                      <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                        {post.category}
                      </span>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <span className="absolute inset-0" />
                        {post.title}
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                        {post.description}{" "}
                        <span className="text-blue-500 hover:text-blue-600">
                          Read More...
                        </span>
                      </p>
                    </div>
                    <div className="relative mt-8 flex items-center gap-x-4">
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <span className="absolute inset-0" />
                          {post.author.name}
                        </p>
                        <p className="text-gray-600">{post.author.role}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout1>
    </>
  );
}
