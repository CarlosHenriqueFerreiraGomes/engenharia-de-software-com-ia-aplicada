import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demo - Better Auth + GitHub + Next.js",
  description: "Simple authentication demo with Better Auth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  );
}
