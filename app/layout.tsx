// app/layout.tsx
import "./styles/globals.css";
import { ReactNode } from "react";
import { GameProvider } from "./context/GameContext";

export const metadata = {
  title: "Candidate Simulator",
  description: "An educational simulator for federal campaign training",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
