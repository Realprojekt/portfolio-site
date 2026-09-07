export default function About({ profile }) {
  return (
    <section className="section container" id="about">
      <span className="section-label">01 · About</span>
      <h2 className="section-title">Who I am</h2>
      <div className="about-text">
        {profile.about.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}
