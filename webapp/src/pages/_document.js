import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="Get the most out of ChatGPT with carefully crafted and optmized message templates"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/whatbot_icon.png" />
        <meta property="og:image" content="/whatbot_meta_image.png" />
        <meta property="og:title" content="WhatBot | ChatGPT Templates" />
        <meta
          property="og:description"
          content="Get the most out of ChatGPT with carefully crafted and optmized message templates"
        />
        <meta property="twitter:image" content="/whatbot_meta_image.png" />
        <meta name="twitter:card" content="summary_large_image"></meta>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-D22CC4EHE4`}
        />
        <Script strategy="afterInteractive" id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-D22CC4EHE4', {
            page_path: window.location.pathname,
          });
          `}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
