import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/common/Preloader";

export const metadata: Metadata = {
  title: "JionaFashion — Modern South Asian Dailywear & Casual Fashion",
  description:
    "Discover effortless everyday South Asian fashion at JionaFashion. Shop breathable cotton kurtis, short kurtas, linen palazzos, and relaxed dailywear for men and women. Comfort meets tradition.",
  keywords: [
    "JionaFashion",
    "casual ethnic wear",
    "dailywear kurti",
    "cotton kurtas",
    "short kurta",
    "linen palazzo",
    "everyday South Asian fashion",
    "ready-to-wear",
    "contemporary ethnic fashion",
  ],
  openGraph: {
    title: "JionaFashion — Modern South Asian Dailywear",
    description:
      "Breathable cottons, modern silhouettes, and effortless everyday clothing for men and women.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
