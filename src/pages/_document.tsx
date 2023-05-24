import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.cdnfonts.com/css/metropolis1920"
          rel="stylesheet"
        ></link>

        <link
          href="https://fonts.cdnfonts.com/css/space-age"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.cdnfonts.com/css/nk57-monospace"
          rel="stylesheet"
        ></link>

        <link
          href="https://fonts.cdnfonts.com/css/montserrat"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
