import type { Metadata } from "next";
import { Work_Sans, Inter, Poppins } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "DeJoule — Intelligence Meets Impact | Smart Building Management",
  description:
    "DeJoule turns every minute into measurable gain across energy, uptime, and user satisfaction. Smart analytics, alerts, monitoring & intelligent automation for your building.",
  keywords: [
    "smart building",
    "building management",
    "AFDD",
    "smart alerts",
    "energy optimization",
    "facility management",
    "DeJoule",
  ],
};

import QueryProvider from "@/lib/query-provider";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${inter.variable} ${poppins.variable}`}
    >
      <body className="overflow-x-hidden w-full" suppressHydrationWarning>
        <QueryProvider>
          {children}
          <Toaster position="top-center" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
