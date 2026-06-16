import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/components/theme/ThemeProvider";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bryan Raharjo U - Informatics Student",
  description:
    "Personal portfolio of Bryan Raharjo, an Informatics student and aspiring Software Engineer specializing in full-stack web development.",
  keywords: [
    "software engineer",
    "full-stack developer",
    "Next.js",
    "TypeScript",
    "portfolio",
  ],
  authors: [{ name: "Bryan Raharjo" }],
  openGraph: {
    title: "Bryan Raharjo U - Informatics Student",
    description:
      "Personal portfolio showcasing projects, skills, and experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
