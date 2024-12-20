import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Create a navigation bar */}
        <nav className="flex justify-center gap-6 items-center p-4 bg-gray-800 text-white">
          <a href="/" className="text-lg">
            Home
          </a>
          <a href="/recipes" className="text-lg">
            Recipe Generator
          </a>
          <a href="/search" className="text-lg hidden md:block">
            Search Recipes
          </a>
          <a href="/creator" className="text-lg hidden md:block">
            Concoction Incubator
          </a>
        </nav>

        {children}
      </body>
    </html>
  );
}
