import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "K mobile massage",
    description: "K mobile massage. 24Hours, 365 Days a Year. Seoul, Korea mobile massage.",
    keywords: ["mobile massage", "seoul massage", "outcall massage", "korea mobile massage"],
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        type: "website",
        url: "https://k-mobilemassage.com/",
        title: "K Mobile Massage",
        description:
            "mobile massage, seoul massage, outcall massage, korea mobile massage",
        siteName: "K Mobile Massage",
        images: [
            { url: "/image/og.png", width: 700, height: 800, alt: "K Mobile Massage" },
        ],
        locale: "ko_KR",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}

