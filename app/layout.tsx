import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
// app/layout.tsx
import { CandidateProvider } from "./context/CandidateContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CandidateProvider>{children}</CandidateProvider>
      </body>
    </html>
  );
}
