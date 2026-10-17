import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "MULTIMAX | Ropa americana al por mayor y por unidad",
  description:
    "Ropa americana de calidad en pacas y por unidades. Compra al por mayor o escoge prenda por prenda en Costa Rica.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CR" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
