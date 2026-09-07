export default function Hero({ profile }) {
  return (
    <section className="hero container" id="top">
      <span className="hero-eyebrow">{profile.role} · {profile.location}</span>
      <h1 className="hero-title">{profile.name}</h1>
      <p className="hero-subtitle">{profile.tagline}</p>
      <div className="hero-actions">
        <a className="btn btn-primary" href="#projects">View Projects</a>
        <a className="btn btn-secondary" href={profile.resumeUrl} target="_blank" rel="noreferrer">
          Download Resume
        </a>
        <a className="btn btn-secondary" href="#contact">Get in Touch</a>
      </div>
    </section>
  )
}
