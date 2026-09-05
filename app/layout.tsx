import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#05070B",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "IEEE Computer Society GITAM | Visakhapatnam",
  description:
    "IEEE Computer Society GITAM Visakhapatnam — a student technology community focused on computing, innovation, collaboration, research and leadership.",
  keywords: [
    "IEEE",
    "IEEE Computer Society",
    "GITAM",
    "Visakhapatnam",
    "GITAM University",
    "Recruitment 2026",
    "Student Technology Community",
    "AI/ML",
    "Engineering",
    "Hackathons"
  ],
  authors: [{ name: "IEEE Computer Society GITAM" }],
  creator: "IEEE Computer Society GITAM",
  publisher: "IEEE Computer Society GITAM",
  metadataBase: new URL("https://ieeecs-gitam.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "IEEE Computer Society GITAM | Visakhapatnam",
    description:
      "IEEE Computer Society GITAM Visakhapatnam — a student technology community focused on computing, innovation, collaboration, research and leadership.",
    url: "https://ieeecs-gitam.org",
    siteName: "IEEE Computer Society GITAM",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-preview.png",
        width: 1200,
        height: 630,
        alt: "IEEE Computer Society GITAM Visakhapatnam"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "IEEE Computer Society GITAM | Visakhapatnam",
    description:
      "IEEE Computer Society GITAM Visakhapatnam — a student technology community focused on computing, innovation, collaboration, research and leadership.",
    creator: "@ieeecs_gitam"
  },
  icons: {
    icon: "/ieee-cs-logo.svg",
    apple: "/ieee-cs-logo.svg",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} scroll-smooth dark`}
    >
      <body className="min-h-screen bg-[#05070B] text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
