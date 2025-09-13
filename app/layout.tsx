// app/layout.tsx
import "./globals.css";
import { CandidateProvider } from "./context/CandidateContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CandidateProvider>
          {children}
        </CandidateProvider>
      </body>
    </html>
  );
}
