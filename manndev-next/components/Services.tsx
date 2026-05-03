"use client"
import { useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const tabs = [
  {
    id: "landing", label: "Landing Page", title: "LANDING PAGE",
    desc: "A single, focused page built to convert. Ideal for product launches, campaigns, or businesses that need a strong web presence fast. I handle the design and development — you just need to tell me what you want it to do.",
    items: ["Strategy & copy direction call", "Custom design — no templates", "Fully responsive, mobile-first build", "Contact form or CTA integration", "Performance-optimised & SEO-ready", "Deployed & live within 2 weeks"],
    stack: ["HTML", "CSS", "JavaScript", "or Next.js", "Vercel"],
  },
  {
    id: "website", label: "Full Website", title: "FULL WEBSITE",
    desc: "A multi-page site with everything your business needs — about, services, portfolio, blog, contact. Built clean and fast from scratch. I work through design and development together so nothing gets lost between the two.",
    items: ["Discovery & scope call", "Sitemap & wireframes", "Custom design system", "Full responsive build, all pages", "CMS integration if needed", "Analytics, SEO, & deployment", "30 days post-launch support"],
    stack: ["Next.js", "React", "Tailwind CSS", "Sanity / Contentful", "Vercel"],
  },
  {
    id: "webapp", label: "Web App", title: "WEB APP",
    desc: "Custom web applications — dashboards, booking systems, client portals, internal tools. I can take you from idea to deployed product. Scope is agreed upfront and I keep you in the loop at every stage. No surprise invoices.",
    items: ["Technical scoping & architecture", "UI/UX design & prototyping", "Full-stack development", "Authentication & database setup", "API integrations as required", "Testing, deployment & documentation"],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Stripe", "Vercel"],
  },
  {
    id: "maintenance", label: "Maintenance", title: "MAINTENANCE",
    desc: "Ongoing care for sites I've built or ones you've inherited. Updates, fixes, performance improvements, new sections added as you grow. Available as a monthly retainer or on an ad-hoc basis.",
    items: ["Content & copy updates", "Dependency & security updates", "Performance monitoring", "Bug fixes & browser testing", "New feature additions", "Priority response — within 24hrs"],
    stack: ["Any Stack", "Monthly Retainer", "Ad-hoc"],
  },
]

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}
const itemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
}
const tagVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
}

export default function Services() {
  const [active, setActive] = useState("landing")
  const tab = tabs.find((t) => t.id === active)!

  return (
    <section id="services">
      <div className="section-header">
        <motion.span
          className="section-label"
          style={{ fontFamily: "var(--bebas)" }}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.8 }}
        >
          Services
        </motion.span>
        <motion.span
          className="section-num"
          style={{ fontFamily: "var(--bebas)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          02 / 04
        </motion.span>
      </div>

      <div className="tabs-row" style={{ fontFamily: "var(--mono)" }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`tab-btn${active === t.id ? " active" : ""}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="services-note">Pricing is per project and depends on scope. Get in touch for a quote tailored to what you need.</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="tab-top">
            <h3 className="tab-title" style={{ fontFamily: "var(--bebas)" }}>{tab.title}</h3>
            <a href="#contact" className="tab-cta" style={{ fontFamily: "var(--mono)" }}>Enquire Now →</a>
          </div>

          <div className="tab-body">
            <div className="tab-desc-col">
              <p className="tab-desc">{tab.desc}</p>
            </div>
            <div className="tab-includes-col">
              <span className="tab-includes-label" style={{ fontFamily: "var(--mono)" }}>What&apos;s included</span>
              <motion.div variants={listVariants} initial="hidden" animate="visible">
                {tab.items.map((item, i) => (
                  <motion.div key={i} className="include-item" variants={itemVariants}>{item}</motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          <motion.div
            className="tab-stack"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.35 } } }}
            initial="hidden"
            animate="visible"
          >
            {tab.stack.map((s, i) => (
              <motion.span key={i} className="stack-tag" variants={tagVariants} style={{ fontFamily: "var(--mono)" }}>{s}</motion.span>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
