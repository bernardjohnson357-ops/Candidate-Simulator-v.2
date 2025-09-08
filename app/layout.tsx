import React from "react";
import "./globals.css"; // ✅ make sure this line is here

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
