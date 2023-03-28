import { Html, Head, Main, NextScript } from "next/document";
import { Toaster } from "react-hot-toast";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Toaster />
      </body>
    </Html>
  );
}
