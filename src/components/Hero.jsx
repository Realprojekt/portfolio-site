import { useLanguage } from '../i18n/LanguageContext'

export default function Hero({ profile }) {
  const { lang, t } = useLanguage()
  const content = profile[lang]

  const nameParts = profile.name.trim().split(' ')
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : ''
  const firstName = lastName ? nameParts.slice(0, -1).join(' ') : nameParts.join(' ')

  return (
    <section className="hero container" id="top">
      <span className="hero-status">
        <span className="hero-status-dot" aria-hidden="true" />
        {t.hero.status}
      </span>
      <span className="hero-eyebrow">
        {content.role}
        <span className="hero-eyebrow-sep">·</span>
        {profile.location[lang]}
      </span>
      <h1 className="hero-title">
        <span className="hero-title-first">{firstName}</span>
        {lastName && <span className="hero-title-last">{lastName}</span>}
      </h1>
      <p className="hero-subtitle">{content.tagline}</p>
      <div className="hero-actions">
        <a className="btn btn-primary" href="#projects">{t.hero.viewProjects}</a>
        {profile.resumeUrl && (
          <a className="text-link" href={profile.resumeUrl} target="_blank" rel="noreferrer">
            {t.hero.downloadResume}
          </a>
        )}
        <a className="text-link" href="#contact">{t.hero.getInTouch}</a>
      </div>
    </section>
  )
}
