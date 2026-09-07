import { useLanguage } from '../i18n/LanguageContext'

export default function Hero({ profile }) {
  const { lang, t } = useLanguage()
  const content = profile[lang]

  return (
    <section className="hero container" id="top">
      <span className="hero-eyebrow">{content.role} · {profile.location[lang]}</span>
      <h1 className="hero-title">{profile.name}</h1>
      <p className="hero-subtitle">{content.tagline}</p>
      <div className="hero-actions">
        <a className="btn btn-primary" href="#projects">{t.hero.viewProjects}</a>
        {profile.resumeUrl && (
          <a className="btn btn-secondary" href={profile.resumeUrl} target="_blank" rel="noreferrer">
            {t.hero.downloadResume}
          </a>
        )}
        <a className="btn btn-secondary" href="#contact">{t.hero.getInTouch}</a>
      </div>
    </section>
  )
}
