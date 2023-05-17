import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import i18nextConfig from "../../next-i18next.config";

export default function Document(this: any) {
  const currentLocale =
    this?.props.__NEXT_DATA__.query.locale || i18nextConfig.i18n.defaultLocale;

  return (
    <Html lang={currentLocale}>
      <Head />
      <body>
        <Main />
        <NextScript />
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
      </body>
    </Html>
  );
}
