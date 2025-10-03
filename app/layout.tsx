// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Federal Candidate Simulator",
  description: "Interactive simulator for federal candidates",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="p-4 shadow-md bg-white">
          <h1 className="text-xl font-bold">Federal Candidate Simulator</h1>
        </header>
        <main className="p-6">{children}</main>
        <footer className="p-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Candidate Simulator
        </footer>
      </body>
    </html>
  );
}
