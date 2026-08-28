import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pamtech Group | Committed Service to Humanity | 10 Years of Excellence",
  description:
    "Celebrating a decade of excellence. Pamtech Group is a diversified Nigerian conglomerate transforming Oil & Gas, Automotive Care, Genuine Spare Parts, Luxury Mobility, Digital Technology, Media, Real Estate, and Community Development.",
  keywords: [
    "Pamtech Group",
    "Pamtech Oil and Gas",
    "Pamtech Autoland",
    "Pamtech Autoparts",
    "Pamtech Luxury Ride",
    "Pamtech Media",
    "Pamtech Technology",
    "Pamtech Real Estate",
    "Pamtech Foundation",
    "Owerri Imo State",
    "Port Harcourt",
    "Nigeria Business Conglomerate",
  ],
  authors: [{ name: "Pamtech Group" }],
  openGraph: {
    title: "Pamtech Group | Committed Service to Humanity",
    description:
      "Transforming industries across Nigeria with innovation and excellence. Discover our 8 business lines, 10-year story, and community impact.",
    url: "https://pamtechgroup.com",
    siteName: "Pamtech Group",
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} dark`}>
      <body className="bg-[#101828] text-[#F3F4F6] antialiased selection:bg-[#E7000B] selection:text-white">
        <SmoothScroll>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </SmoothScroll>
      </body>
    </html>
  );
}
