"use client"
import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

const steps = [
  { num: "01", title: "Initial Enquiry", body: "Fill in the contact form or email me directly. Tell me what you need — even a rough idea is enough to start. I'll get back to you within 24 hours with initial thoughts and availability." },
  { num: "02", title: "Discovery Call", body: "A 30–60 minute call to understand your goals, audience, and what you need the site to do. We'll talk through examples, timelines, and budget. No obligation — if it's not the right fit, I'll say so." },
  { num: "03", title: "Proposal & Scope", body: "A written proposal covering exactly what's included, the timeline, and the fixed price. No hourly rates, no scope creep surprises. A deposit confirms the booking and locks in your start date." },
  { num: "04", title: "Design & Build", body: "I design and build in parallel, sharing progress at key checkpoints. You'll see a live preview before anything goes public. Feedback rounds are built into the schedule so there's time to refine." },
  { num: "05", title: "Launch & Handover", body: "Once you're happy, I deploy to your domain. You get full access to everything — code, hosting, accounts. I'll walk you through how to manage it and stay available for 30 days post-launch at no extra charge." },
]

function ProcessItem({ step, index }: { step: typeof steps[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className={`process-item${open ? " open" : ""}`}>
      <motion.div
        style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: "var(--accent)", scaleY, transformOrigin: "top" }}
      />
      <motion.div
        className="process-trigger"
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, amount: 0.5 }}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="process-step-num" style={{ fontFamily: "var(--bebas)" }}>{step.num}</span>
        <span className="process-step-title" style={{ fontFamily: "var(--bebas)" }}>{step.title}</span>
        <span className="process-icon">{open ? "×" : "+"}</span>
      </motion.div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="process-body-inner">{step.body}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Process() {
  return (
    <section id="process">
      <div className="section-header">
        <motion.span
          className="section-label"
          style={{ fontFamily: "var(--bebas)" }}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.8 }}
        >
          How It Works
        </motion.span>
        <motion.span
          className="section-num"
          style={{ fontFamily: "var(--bebas)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          03 / 04
        </motion.span>
      </div>
      {steps.map((step, i) => <ProcessItem key={step.num} step={step} index={i} />)}
    </section>
  )
}
