import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Product Signal Radar",
  description: "A full-stack social listening and KOL action workspace for AI product GTM."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
