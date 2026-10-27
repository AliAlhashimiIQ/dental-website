import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Readex_Pro } from "next/font/google";
import "./globals.css";

const readexPro = Readex_Pro({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "لُما لطب الأسنان — Luma Dental",
  description:
    "عيادة لُما لطب الأسنان — استشارات تبييض الأسنان والعناية التجميلية الهادئة بتجربة رقمية متقنة.",
  openGraph: {
    title: "لُما لطب الأسنان — Luma Dental",
    description:
      "عيادة لُما لطب الأسنان — استشارات تبييض الأسنان والعناية التجميلية الهادئة بتجربة رقمية متقنة.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "لُما لطب الأسنان — Luma Dental",
    description:
      "عيادة لُما لطب الأسنان — استشارات تبييض الأسنان والعناية التجميلية الهادئة بتجربة رقمية متقنة.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${readexPro.variable} ${ibmPlexArabic.variable}`}
    >
      <body
        suppressHydrationWarning
        className="bg-[#F8FAFC] text-[#0F172A] antialiased selection:bg-sky-700 selection:text-white font-sans"
      >
        {children}
      </body>
    </html>
  );
}
