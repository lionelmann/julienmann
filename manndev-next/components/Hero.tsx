"use client"
import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, Variants } from "framer-motion"

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const phrases = [
  "built to last.", "clean code, every time.", "no templates. ever.",
  "fast by default.", "ships on time.", "your vision, properly built.", "performance is a feature.",
]

export default function Hero() {
  const [text, setText] = useState("")
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const codeOpacity = useTransform(scrollYProgress, [0, 0.5], [0.55, 0])

  // typewriter
  useEffect(() => {
    const phrase = phrases[phraseIdx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(phrase.slice(0, charIdx + 1))
        if (charIdx + 1 === phrase.length) {
          setTimeout(() => setDeleting(true), 2200)
        } else {
          setCharIdx((c) => c + 1)
        }
      } else {
        setText(phrase.slice(0, charIdx - 1))
        if (charIdx - 1 === 0) {
          setDeleting(false)
          setPhraseIdx((p) => (p + 1) % phrases.length)
          setCharIdx(0)
        } else {
          setCharIdx((c) => c - 1)
        }
      }
    }, deleting ? 45 : 80)
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, phraseIdx])

  // scroll progress bar
  useEffect(() => {
    const bar = document.createElement("div")
    bar.id = "progress-bar"
    Object.assign(bar.style, { position: "fixed", top: "0", left: "0", height: "2px", background: "var(--accent)", width: "0%", zIndex: "9997", transition: "width .08s linear" })
    document.body.appendChild(bar)
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100
      bar.style.width = pct + "%"
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => { window.removeEventListener("scroll", onScroll); bar.remove() }
  }, [])

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } }
  }
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } }
  }

  return (
    <section id="hero" ref={heroRef}>
      <motion.div className="hero-grid" style={{ y: gridY }} aria-hidden="true" />

      <motion.div
        className="hero-code"
        style={{ opacity: codeOpacity }}
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 0.55 }}
        transition={{ duration: 1.2, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <span className="c-dim">// mann dev</span>
        <span><span className="c-accent">const</span> site = <span className="c-accent">build</span>{"({"}</span>
        <span>&nbsp;&nbsp;design: <span className="c-string">&apos;custom&apos;</span>,</span>
        <span>&nbsp;&nbsp;templates: <span className="c-accent">false</span>,</span>
        <span>&nbsp;&nbsp;performance: <span className="c-string">&apos;100&apos;</span>,</span>
        <span>&nbsp;&nbsp;turnaround: <span className="c-string">&apos;2 weeks&apos;</span></span>
        <span>{"})"})</span>
        <span className="c-dim">// → ships on time.</span>
      </motion.div>

      <motion.p
        className="hero-kicker"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        Montréal
      </motion.p>

      <h1 className="hero-title">
        <div className="hero-title-top">
          <motion.span
            className="hero-title-top-word"
            style={{ fontFamily: "var(--serif)" }}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            dev
          </motion.span>
        </div>
        <div className="hero-title-bottom">
          <motion.span
            className="hero-title-main"
            style={{ fontFamily: "var(--bebas)", y: titleY }}
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            MANN
          </motion.span>
        </div>
      </h1>

      <motion.div
        className="hero-bottom"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-desc" variants={itemVariants}>
          Websites &amp; web apps built for people who take their business seriously.<br />Clean code. No templates.
        </motion.p>
        <motion.div className="hero-typewriter" style={{ fontFamily: "var(--serif)" }} variants={itemVariants}>
          <span className="tw-cursor">{text}</span>
        </motion.div>
        <motion.div className="hero-meta" variants={itemVariants}>
          Available 2026<br />
          3 Years Building<br />
          15+ Sites Launched<br /><br />
          ↓ Scroll to explore
        </motion.div>
      </motion.div>
    </section>
  )
}
