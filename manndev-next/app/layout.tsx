import type { Metadata } from "next"
import { Bebas_Neue, IBM_Plex_Mono, Playfair_Display } from "next/font/google"
import "./globals.css"

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--bebas" })
const mono = IBM_Plex_Mono({ weight: ["300", "400", "500"], style: ["normal", "italic"], subsets: ["latin"], variable: "--mono" })
const serif = Playfair_Display({ weight: ["400", "700"], style: ["normal", "italic"], subsets: ["latin"], variable: "--serif" })

export const metadata: Metadata = {
  title: "Mann Dev — Web Design & Development",
  description: "Websites & web apps built for people who take their business seriously. Clean code. No templates.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${bebas.variable} ${mono.variable} ${serif.variable}`}>
      <body style={{ fontFamily: "var(--mono)" }}>{children}</body>
    </html>
  )
}
