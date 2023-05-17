import React, { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ComponentProps } from "react";

interface NextLinkProps extends ComponentProps<"a"> {
  skipLocaleHandling?: boolean;
}

const LinkComponent = ({
  children,
  skipLocaleHandling,
  ...rest
}: NextLinkProps) => {
  const router = useRouter();
  const locale = (rest as any).locale || router.query.locale || "";

  let href = (rest as any).href || router.asPath;
  if (href.indexOf("http") === 0) skipLocaleHandling = true;
  if (locale && !skipLocaleHandling) {
    href = href
      ? `/${locale}${href}`
      : router.pathname.replace("[locale]", locale);
  }

  return (
    <>
      <Link href={href} legacyBehavior>
        <a {...rest}>{children}</a>
      </Link>
    </>
  );
};

export default LinkComponent;
