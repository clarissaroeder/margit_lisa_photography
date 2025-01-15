import { Geist, Geist_Mono, Frank_Ruhl_Libre, Prata } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const frank = Frank_Ruhl_Libre({
  variable: "--font-frank-ruhl-libre",
  subsets: ["latin"],
});

export const prata = Prata({
  variable: "--font-prata",
  weight: ["400"],
  subsets: ["latin"],
});