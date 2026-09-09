import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nuestro Espacio",
  description: "Un rinconcito compartido.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300 min-h-screen pb-24`}>
        <ThemeProvider>
          <main className="max-w-5xl mx-auto p-6 md:p-12">
            {children}
          </main>
          <Navigation />
        </ThemeProvider>
      </body>
    </html>
  );
}