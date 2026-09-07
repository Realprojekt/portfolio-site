export default function Contact({ profile }) {
  return (
    <section className="section container" id="contact">
      <span className="section-label">05 · Contact</span>
      <h2 className="contact-title">Let's work together.</h2>
      <p className="contact-text">
        I'm currently open to new opportunities. Whether you have a question or just want to say hi,
        my inbox is always open.
      </p>
      <div className="contact-actions">
        <a className="btn btn-primary" href={`mailto:${profile.email}`}>Say Hello</a>
        {profile.social
          .filter((s) => s.label !== 'Email')
          .map((s) => (
            <a className="btn btn-secondary" key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
      </div>
    </section>
  )
}
