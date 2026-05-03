"use client"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <a href="/" className="footer-logo" style={{ fontFamily: "var(--bebas)" }}>JULIEN MANN</a>
      <p className="footer-copy">© 2026 Mann Dev. All rights reserved. Montréal.</p>
      <div className="footer-social" style={{ fontFamily: "var(--mono)" }}>
        <a href="https://www.linkedin.com/in/julien-mann-b153aa404/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </motion.footer>
  )
}
