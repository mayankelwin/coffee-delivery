import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import "./globals.css"
import { ToastProvider } from "../provider/ToastProvider"

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Coffee Delivery",
  description: "Seu café quentinho na palma de sua mão",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased`}
      >
        <ToastProvider />
        {children}
      </body>
    </html>
  )
}
