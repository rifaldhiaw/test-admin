import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter as FontSans } from "@next/font/google";
import type { AppProps } from "next/app";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={cn(
        "min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50",
        fontSans.variable
      )}
    >
      <Component {...pageProps} />
    </main>
  );
}
