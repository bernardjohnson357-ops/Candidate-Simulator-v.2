// app/layout.tsx
import React from "react";

export const metadata = {
  title: "Candidate Simulator",
  description: "AI-driven federal candidate simulator",
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          backgroundColor: "#f9fafb",
          color: "#111827",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "1rem",
        }}
      >
        {children}
      </body>
    </html>
  );
};

export default Layout;
