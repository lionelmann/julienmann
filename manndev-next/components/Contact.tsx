"use client"
import { useState } from "react"
import { motion, Variants } from "framer-motion"

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fieldVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}
const fieldItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

export default function Contact() {
  const [chars, setChars] = useState(300)
  const [status, setStatus] = useState("All enquiries answered personally.")
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    setStatus("Sending…")
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.success) {
        setStatus("✓ Message received. I'll be in touch soon.")
        ;(e.target as HTMLFormElement).reset()
        setChars(300)
      } else {
        setStatus("Error. Please try again.")
      }
    } catch {
      setStatus("Error. Please try again.")
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact">
      <div className="section-header">
        <motion.span
          className="section-label"
          style={{ fontFamily: "var(--bebas)" }}
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.8 }}
        >
          Get in Touch
        </motion.span>
        <motion.span
          className="section-num"
          style={{ fontFamily: "var(--bebas)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          04 / 04
        </motion.span>
      </div>

      <div className="contact-grid">
        <div className="contact-left">
          <motion.h2
            className="contact-headline"
            style={{ fontFamily: "var(--bebas)" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            GET IN<br />TOUCH
          </motion.h2>

          {[
            { label: "Availability", val: <><span className="availability-dot" />Currently taking on new projects</> },
            { label: "Base", val: <>Montréal, QC<br /><span style={{ color: "var(--mid)", fontSize: ".8rem" }}>Remote-friendly worldwide</span></> },
            { label: "Response Time", val: "Within 24 hours" },
          ].map((d, i) => (
            <motion.div
              key={d.label}
              className="contact-detail"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="contact-detail-label">{d.label}</div>
              <div className="contact-detail-val">{d.val}</div>
            </motion.div>
          ))}
        </div>

        <div className="contact-right">
          <form onSubmit={handleSubmit} style={{ fontFamily: "var(--mono)" }}>
            <input type="hidden" name="access_key" value="3da1f7ac-99e9-49bd-8aa1-c3b621510613" />
            <input type="hidden" name="subject" value="New Web Dev Enquiry — Mann Dev" />
            <input type="checkbox" name="botcheck" style={{ display: "none" }} />

            <motion.div variants={fieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <motion.div className="form-row" variants={fieldItem}>
                <div className="form-field">
                  <input className="form-input" type="text" id="fname" name="fname" placeholder="x" autoComplete="off" required style={{ fontFamily: "var(--mono)" }} />
                  <label className="form-label-float" htmlFor="fname">First Name</label>
                </div>
                <div className="form-field">
                  <input className="form-input" type="text" id="lname" name="lname" placeholder="x" autoComplete="off" required style={{ fontFamily: "var(--mono)" }} />
                  <label className="form-label-float" htmlFor="lname">Last Name</label>
                </div>
              </motion.div>

              <motion.div className="form-field" variants={fieldItem}>
                <input className="form-input" type="email" id="email" name="email" placeholder="x" autoComplete="off" required style={{ fontFamily: "var(--mono)" }} />
                <label className="form-label-float" htmlFor="email">Email Address</label>
              </motion.div>

              <motion.div className="form-field" variants={fieldItem}>
                <select className="form-select" id="service" name="service" style={{ fontFamily: "var(--mono)" }}>
                  <option value="" disabled>— Select a service</option>
                  <option>Landing Page</option>
                  <option>Full Website</option>
                  <option>Web App</option>
                  <option>Maintenance</option>
                  <option>Not sure yet</option>
                </select>
              </motion.div>

              <motion.div className="form-field" style={{ position: "relative" }} variants={fieldItem}>
                <textarea className="form-textarea" id="message" name="message" placeholder="x" maxLength={300} required
                  style={{ fontFamily: "var(--mono)" }}
                  onChange={(e) => setChars(300 - e.target.value.length)} />
                <label className="form-label-float" htmlFor="message">Tell me about your project</label>
                <span className={`char-count${chars < 60 ? " warn" : ""}`}>{chars}</span>
              </motion.div>

              <motion.div className="submit-row" variants={fieldItem}>
                <button className="form-submit" type="submit" disabled={sending} style={{ fontFamily: "var(--mono)" }}>
                  <span>Send Enquiry</span>
                </button>
                <span className="submit-note">{status}</span>
              </motion.div>
            </motion.div>
          </form>
        </div>
      </div>
    </section>
  )
}
