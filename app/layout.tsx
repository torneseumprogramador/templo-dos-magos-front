import type React from "react";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/contexts/cart-context";
import { SearchProvider } from "@/contexts/search-context";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Templo dos Magos",
  description: "Sua loja de cartas mágicas e jogos de tabuleiro",
  manifest: "/manifest.json",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={nunito.className}>
        <Suspense fallback={<div>Carregando layout...</div>}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <CartProvider>
                <SearchProvider>
                  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
                  <Toaster />
                </SearchProvider>
              </CartProvider>
            </AuthProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
