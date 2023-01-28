import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import type { AppProps } from "next/app";

const fontSans = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-sans: ${fontSans.style.fontFamily};
          }
        `}
      </style>
      <main
        className={cn(
          "min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50"
        )}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}
