export default function Footer({ profile }) {
  return (
    <footer className="footer container">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <div className="footer-links">
        {profile.social.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
        ))}
      </div>
    </footer>
  )
}
