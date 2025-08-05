import { Toaster } from "@/components/ui/sonner";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
         <Head>
      <link rel="icon" href="/pixels-pink.jpg" />
      </Head>
      <body className="antialiased">
        <Main />
        <Toaster />
        <NextScript />
      </body>
    </Html>
  );
}
