import './globals.css';

export const metadata = {
  title: 'Candidate Simulator',
  description: 'AI-driven campaign simulator'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
