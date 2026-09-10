import type { Metadata } from "next";
import { Lora, Caveat } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";

const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "Valeria",
  description: "Un pequeño espacio nuestro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${lora.variable} ${caveat.variable} font-serif min-h-screen pb-24 overflow-x-hidden`}>
        <ThemeProvider>
          <main className="max-w-4xl mx-auto p-4 md:p-8">
            {children}
          </main>
          <Navigation />
        </ThemeProvider>
      </body>
    </html>
  );
}