// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Federal Candidate Simulator",
  description: "Interactive simulator for federal campaign readiness",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {/* ✅ Accessible navigation landmark */}
        <nav className="p-4 bg-blue-600 text-white shadow-md">
          <h1 className="text-xl font-bold">Federal Candidate Simulator</h1>
        </nav>

        {/* ✅ Accessible main landmark */}
        <main className="p-6 flex flex-col items-center">{children}</main>

        <footer className="mt-10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Candidate Simulator Project
        </footer>
      </body>
    </html>
  );
}
