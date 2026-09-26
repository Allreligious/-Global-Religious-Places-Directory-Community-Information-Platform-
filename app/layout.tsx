import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Global Religious Places Directory",
  description:
    "Discover religious places, spiritual centers, events, and community services.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
