import "./globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
// import { TailwindIndicator } from "@/src/components/tailwind-indicator";
// import Web3Provider from "@/components/web3-provider";
import TrendingTokens from "@/components/trending-tokens";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        {/* <Web3Provi÷\der> */}
        <Navbar />
        <TrendingTokens />
        {children}
        <Footer />
        {/* </Web3Provi÷> */}
        {/* <TailwindIndicator /> */}
      </body>
    </html>
  );
}
