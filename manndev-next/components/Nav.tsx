"use client"
import { useEffect, useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

export default function Nav() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (y) => {
    setHidden(y > (scrollY.getPrevious() ?? 0) && y > 100)
    setScrolled(y > 50)
  })

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    document.documentElement.setAttribute("data-theme", next)
  }

  // scramble effect
  const scramble = (el: HTMLElement) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const original = el.dataset.text || el.textContent || ""
    let iter = 0
    const iv = setInterval(() => {
      el.textContent = original.split("").map((c, i) => {
        if (c === " ") return " "
        if (i < iter) return original[i]
        return chars[Math.floor(Math.random() * chars.length)]
      }).join("")
      if (iter >= original.length) clearInterval(iv)
      iter += 0.5
    }, 40)
  }

  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".scramble").forEach((el) => {
      el.addEventListener("mouseenter", () => scramble(el))
    })
  }, [])

  return (
    <motion.nav
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={scrolled ? "scrolled" : ""}
    >
      <div className="nav-inner">
        <a href="/" className="nav-logo scramble" data-text="JULIEN MANN" style={{ fontFamily: "var(--bebas)" }}>JULIEN MANN</a>
        <ul className="nav-links" style={{ fontFamily: "var(--mono)" }}>
          <li><a href="#about" className="scramble" data-text="About">About</a></li>
          <li><a href="#services" className="scramble" data-text="Services">Services</a></li>
          <li><a href="#process" className="scramble" data-text="Process">Process</a></li>
          <li><a href="#contact" className="scramble" data-text="Contact">Contact</a></li>
        </ul>
        <div className="nav-right">
          <button className="theme-toggle" aria-label="Toggle theme" onClick={toggleTheme} style={{ cursor: "none" }} />
          <a href="#contact" className="nav-cta" style={{ fontFamily: "var(--mono)" }}>Get a Quote</a>
        </div>
      </div>
    </motion.nav>
  )
}
