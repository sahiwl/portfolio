import type { Metadata } from "next";

import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ui/theme-provider";

import { exo2, inter, sometypemono, sono, spacegrotesk } from "@/lib/fonts";
import Cursor from "@/components/ui/Cursor";
import NextTopLoader from "nextjs-toploader";
import { MobileNav } from "@/components/MobileNavbar";

import { ThemedParticles } from "@/components/ui/themedParticles";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Sahil Kumar Ray",
  description: "Full stack developer and oss enthusiast. Building web applications, learning and experimenting with new tech over time.",
  keywords: ["sahiwl", "sahil kumar ray", "sahiwl portfolio", "sahiwl.live", "Sahil Kumar Ray"],
  authors: [{ name: "Sahil Kumar Ray", url: "https://sahiwl.live" }],
  openGraph: {
    title: "Sahil Kumar Ray",
    description: "Full stack developer and oss enthusiast.",
    url: "https://sahiwl.live",
    siteName: "Sahil Kumar Ray (sahiwl)",
    images: [
      {
        url: "https://github.com/sahiwl.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  }, 
  creator: 'Sahil Kumar Ray',
  metadataBase: new URL('https://yourdomain.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    //removed suppressHydrationWarning={true} in html tag
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${sometypemono.variable} ${inter.variable} ${exo2.variable} ${sono.variable} ${spacegrotesk.variable} scroll-smooth`}
    >
     <head>
     <Script defer src="https://cloud.umami.is/script.js" data-website-id="01c0c44d-373a-42de-902e-f8aecd113c0e"></Script>
      </head>
      <body className="font-sometypemono dark:bg-zinc-900 bg-[#eae5db]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="overflow-hidden">
            <NextTopLoader
              color="#03A688"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px #2299DD,0 0 5px #2299DD"
              />
            <Navbar />
            <MobileNav />
            <Cursor />
              <ThemedParticles className="fixed inset-0 -z-10 pointer-events-none"/>
            {children}
            <Analytics/>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
