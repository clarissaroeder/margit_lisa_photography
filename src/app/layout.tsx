import Navbar from "./components/navbar";
import { geistSans, geistMono } from "./components/fonts";
import "./globals.css";

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}
      >
          <Navbar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
      </body>
    </html>
  );
}
