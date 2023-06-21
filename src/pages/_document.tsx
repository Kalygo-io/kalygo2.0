import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import i18nextConfig from "../../next-i18next.config";

export default function Document(this: any) {
  const currentLocale =
    this?.props.__NEXT_DATA__.query.locale || i18nextConfig.i18n.defaultLocale;

  return (
    <Html lang={currentLocale} className="h-full">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-NZK69K2');`,
          }}
        />
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NZK69K2" height="0" width="0" style="display: none; visibility: hidden;" />`,
          }}
        />
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
            gtag('config', 'G-Z5KDKVLDYB', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </body>
    </Html>
  );
}
