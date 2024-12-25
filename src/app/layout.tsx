import Navbar from "./ui/navbar";
import { geistSans, geistMono, frank, prata } from "./ui/fonts";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${frank.variable} ${prata.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
