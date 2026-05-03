const items = ["NEXT.JS", "REACT", "TYPESCRIPT", "TAILWIND CSS", "POSTGRESQL", "SUPABASE", "VERCEL", "WEB DESIGN", "DEVELOPMENT", "PERFORMANCE"]

export default function Marquee() {
  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track" style={{ fontFamily: "var(--bebas)" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item">
            {item} <span className="marquee-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
