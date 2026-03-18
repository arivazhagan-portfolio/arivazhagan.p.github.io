import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arivazhagan P | Pharmacist & Quality Professional",
  description: "A seasoned pharmacist and quality professional with 8+ years of experience spanning hospital pharmacy, pharmaceutical manufacturing, and quality management.",
  keywords: ["Pharmacist", "Quality Professional", "B.Pharm", "Pharmaceutical", "Healthcare"],
  authors: [{ name: "Arivazhagan P" }],
  openGraph: {
    title: "Arivazhagan P | Pharmacist & Quality Professional",
    description: "A seasoned pharmacist and quality professional with 8+ years of experience",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
