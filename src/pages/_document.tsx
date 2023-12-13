import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function (co,de,n,but,t,e,r){!n[co]&&(n[co]=function(){
  (n[co].q=n[co].q||[]).push(arguments);});e=t.createElement(but);
  e.async=true;e.src=de;r=t.getElementsByTagName(but)[0];
  r.parentNode.insertBefore(e, r);
  })("CodenButter", "https://buttr.dev/butter.js", window, "script", document);
  window.CodenButter("boot", { siteId: "lyqeovifxc", auto: true })
  `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
