import Script from "next/script";
import { Inter } from "next/font/google";
import { classNames } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "@/styles/tailwind.css";
import "focus-visible";

const inter = Inter({ subsets: ["latin"] });
const title =
  "Justin Sorensen - Web developer, outdoor enthusiast, and trout bum.";
const description =
  "I’m Justin, a web developer who lives and works in the Silicon Valley. I’m passionate about forging web experiences, leveraging cutting edge technologies, exceptional design, instinctive user journeys, and peak performance.";

export const metadata = {
  title,
  description,
  //   icons: ["https://vercel.pub/favicon.ico"],
  openGraph: {
    title,
    description,
    // images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    // images: [image],
    creator: "@sorensenjg",
  },
  metadataBase: new URL("https://sorensenjg.com"),
};

export default function RootLayout({ children }) {
  return (
    <html className="h-full antialiased" lang="en">
      {/* Google tag (gtag.js) */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-CFW0D670WX" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-CFW0D670WX');
        `}
      </Script>
      <body
        className={classNames(
          "flex h-full flex-col bg-zinc-50 dark:bg-black",
          inter.variable
        )}
        suppressHydrationWarning
      >
        <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
          </div>
        </div>
        <div className="relative">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
