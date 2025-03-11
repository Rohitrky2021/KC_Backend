import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
// import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link";
import { Frame } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Retail Pulse Image Processor",
  description: "A service to process images collected from stores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="light"> */}
        <div className="flex flex-col min-h-screen">
          <header className="border-b">
            <div className="container mx-auto px-4 flex h-16 items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 font-semibold text-xl"
              >
                <Frame className="h-6 w-6" />
                <span>Retail Pulse</span>
              </Link>
              <nav className="flex items-center gap-6">
                <Link href="/" className="text-sm font-medium hover:underline">
                  Home
                </Link>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium hover:underline"
                >
                  Dashboard
                </Link>
                <Link
                  href="/test"
                  className="text-sm font-medium hover:underline"
                >
                  Test
                </Link>
                <Link
                  href="/api-docs"
                  className="text-sm font-medium hover:underline"
                >
                  API Docs
                </Link>
              </nav>
            </div>
          </header>
          <main className="flex-1 bg-muted/40">{children}</main>
          <footer className="border-t py-6">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Retail Pulse Image Processing Service
            </div>
          </footer>
        </div>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
