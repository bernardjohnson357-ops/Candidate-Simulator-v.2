// app/layout.tsx
import { GameStateProvider } from "@/context/GameStateContext";

export default function RootLayout({ children }) {
  return (
    <GameStateProvider>
      {children}
    </GameStateProvider>
  );
}
