// pages/_app.tsx
import { GameStateProvider } from "@/context/GameStateContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <GameStateProvider>
      <Component {...pageProps} />
    </GameStateProvider>
  );
}
