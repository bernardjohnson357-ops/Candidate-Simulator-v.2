// app/layout.tsx
import React from "react";
import "./globals.css"; // optional if you have global styles

export const metadata = {
  title: "Candidate Simulator",
  description: "Federal Candidate Simulator App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
