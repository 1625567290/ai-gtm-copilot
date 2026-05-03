import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI GTM Copilot",
  description: "A full-stack GTM planning workspace for AI product launches."
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
