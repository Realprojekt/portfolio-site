import { useLanguage } from '../i18n/LanguageContext'

export default function About({ profile }) {
  const { lang, t } = useLanguage()

  return (
    <section className="section container" id="about">
      <span className="section-label">{t.section.about}</span>
      <h2 className="section-title">{t.titles.about}</h2>
      <div className="about-text">
        {profile[lang].about.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}
