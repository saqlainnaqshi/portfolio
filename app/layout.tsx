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
  title: "Saqlain Naqshi",
  description: "Portfolio of Saqlain Naqshi, a Full Stack Developer",
  openGraph: {
    title: "Saqlain Naqshi",
    description: "Portfolio of Saqlain Naqshi, a Full Stack Developer",
    url: "https://saqlainnaqshi.com",
    siteName: "Saqlain Naqshi",
  }
  ,
  twitter: {
    card: "summary_large_image",
    title: "Saqlain Naqshi",
    description: "Portfolio of Saqlain Naqshi, a Full Stack Developer",
    creator: "@SNaqshi",
    site: "@SNaqshi",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  themeColor: "#ffffff",
  manifest: "/site.webmanifest",
  keywords: [
    "Saqlain Naqshi",
    "Portfolio",
    "Full Stack Developer",
    "Web Developer",
    "Software Engineer",
    "JavaScript",
    "React",
    "Node.js",
    "Next.js",
    "HTML",
    "CSS",
    "TypeScript",
    "Web Design",
    "Web Development",
    "Frontend Developer",
    "Backend Developer",
    "Software Development",
    "Programming",
    "Tech Portfolio",
    "Developer Portfolio",
    "Personal Website",
    "Saqlain",
    "Naqshi",
    "saqlainnaqshi",
    "saqlainnaqshi.com",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noimageindex: false,
    noarchive: false,
    nosnippet: false,
  },
  alternates: {
    canonical: "https://saqlainnaqshi.com",
    types: {
      "application/rss+xml": "/feed.xml",
      "application/atom+xml": "/feed.atom",
      "application/json": "/feed.json",
      "application/ld+json": "/feed.jsonld",
    },
  },
}
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
