import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner"
import { ConvexClientProvider } from "@/providers/ConvexClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Usafi Bora",
  description: "Make your laundry experience seamless and hassle-free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
          <ConvexClientProvider>
            {children}
            <Toaster />
          </ConvexClientProvider>        
        </body>
      </html>
    </ClerkProvider>
  );
}
