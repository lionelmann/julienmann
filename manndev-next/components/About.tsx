"use client"
import { useState, useEffect, useRef } from "react"
import { motion, useInView, Variants } from "framer-motion"

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

function StatBox({ target, label, delay }: { target: number; label: string; delay: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!inView) return
    const dur = 1600, step = 16
    const inc = target / (dur / step)
    let cur = 0
    const t = setInterval(() => {
      cur = Math.min(cur + inc, target)
      setCount(Math.floor(cur))
      if (cur >= target) clearInterval(t)
    }, step)
    return () => clearInterval(t)
  }, [inView, target])

  return (
    <motion.div
      ref={ref}
      className="stat-box"
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      <span className="stat-num" style={{ fontFamily: "var(--bebas)" }}>{count}+</span>
      <span className="stat-label">{label}</span>
    </motion.div>
  )
}

export default function About() {
  const paragraphs = [
    "I'm Julien Mann — a web developer based in Montréal. I build websites and web applications for small businesses, creatives, and startups that want something that actually works and looks the part.",
    "I work solo. No agency overhead, no handoffs between departments. You talk to the person writing the code, from the first call through to launch day and beyond.",
    "If you want a fast, well-built site that represents your business properly, get in touch.",
  ]

  return (
    <section id="about">
      <div className="section-header">
        <motion.span className="section-label" style={{ fontFamily: "var(--bebas)" }}
          initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE }} viewport={{ once: true, amount: 0.8 }}>
          About
        </motion.span>
        <motion.span className="section-num" style={{ fontFamily: "var(--bebas)" }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
          01 / 04
        </motion.span>
      </div>

      <div className="about-grid">
        <div className="about-left">
          <motion.h2 className="about-headline" style={{ fontFamily: "var(--bebas)" }}
            initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE }} viewport={{ once: true, amount: 0.3 }}>
            JUST ME,<br />A CODE<br />EDITOR,<br />AND YOUR<br />BRIEF
          </motion.h2>

          <div className="about-body">
            {paragraphs.map((p, i) => (
              <motion.p key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: EASE }}
                viewport={{ once: true, amount: 0.3 }}>
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div className="about-sig" style={{ fontFamily: "var(--serif)" }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }} viewport={{ once: true }}>
            — Julien Mann
          </motion.div>
        </div>

        <div className="about-right">
          <div className="stats-grid">
            <StatBox target={3}   label="Years Building"   delay={0}   />
            <StatBox target={15}  label="Sites Launched"   delay={0.1} />
            <StatBox target={10}  label="Happy Clients"    delay={0.2} />
            <StatBox target={100} label="Lighthouse Score" delay={0.3} />
          </div>
          <motion.div className="about-manifesto" style={{ fontFamily: "var(--serif)" }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }} viewport={{ once: true, amount: 0.5 }}>
            &ldquo;Good design is as little design as possible. Less, but better — because it concentrates on the essential aspects, and the products are not burdened with non-essentials.&rdquo; — Dieter Rams
          </motion.div>
        </div>
      </div>
    </section>
  )
}
